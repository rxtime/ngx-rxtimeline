import { createSelector } from '../store-lib/selector/create-selector';

import { selectResources } from '../scales/selectors/band-scale.selectors';
import {
  selectScale,
  selectMapTickValueToPositionInScale
} from '../scales/selectors/scale-selectors';
import { selectTimeScale } from '../scales/selectors/time-scale.selectors';
import { mapValues } from '../core/transform-utils';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectAxisTickLineOffset,
  selectAxisFontFace,
  selectAxisFontSize
} from '../options/selectors/axis-options.selectors';
import { partialApply, identity, add } from '../core/function-utils';
import { TimeScale } from '../scales/scale-types';
import { Orientation } from '../core/orientation';
import {
  Point,
  pointToTransform,
  translateOriginInOrientation,
  movePointInOrientation
} from '../core/point';
import { TickMark } from './tick-mark';
import { Line, createOrientedLineFromOrigin } from '../core/line';
import { AxisType, flipAxisType } from '../axis/axis';
import { createOptionsBasedSelector } from '../store-lib/selector/selector-utils';
import { constSelector } from '../store-lib/selector/selector';
import { selectAxisOrientation } from '../options/selectors/options.selectors';
import { partial } from '../core/partial';

// TODO: remove and replace with foo selector
export const selectGetTickPosition = createSelector(
  selectViewTopLeft,
  viewTopLeft => partial(getTickPosition, viewTopLeft)
);

function getTickPosition(
  viewTopLeft: Point,
  orientation: Orientation,
  range: number
): Point {
  return orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: range }
    : { ...viewTopLeft, x: range };
}

const selectGetTickPositionFoo = (axisType: AxisType) =>
  createSelector(
    selectViewTopLeft,
    selectAxisOrientation(axisType),
    partialApply(movePointInOrientation)
  );

const selectGetTimeAxisTickLabel = createSelector(
  selectScale(AxisType.Time),
  getTimeAxisTickLabel
);

function getTimeAxisTickLabel(scale: TimeScale) {
  return (value: Date) => scale.tickFormat()(value);
}

const selectGetTickLabel = (axisType: AxisType) =>
  createOptionsBasedSelector<AxisType, (x: any) => string>({
    Time: selectGetTimeAxisTickLabel,
    Resources: constSelector(identity)
  })(constSelector(axisType));

const selectTickLabelGap = constSelector(-2);
const selectTickLabelSpacing = (axisType: AxisType) =>
  createSelector(selectAxisTickLineOffset(axisType), selectTickLabelGap, add);

const selectTickLabelOffset = (axisType: AxisType) =>
  createSelector(
    selectTickLabelSpacing(axisType),
    selectAxisOrientation(flipAxisType(axisType)),
    translateOriginInOrientation
  );

const selectOrientedTickLine = (axisType: AxisType) =>
  createSelector(
    selectAxisTickLineOffset(axisType),
    selectAxisOrientation(flipAxisType(axisType)),
    createOrientedLineFromOrigin
  );

const selectTickLine = (axisType: AxisType) =>
  createOptionsBasedSelector<Orientation, Line>({
    Horizontal: selectOrientedTickLine(axisType),
    Vertical: selectOrientedTickLine(axisType)
  })(selectAxisOrientation(flipAxisType(axisType)));

// Not happy about this split what depends on
// tick value (label and transform) from rest
export const selectGetAxisTickMark = (axisType: AxisType) =>
  createSelector(
    selectGetTickPositionFoo(axisType),
    selectGetTickLabel(axisType),
    selectTickLabelOffset(axisType),
    selectTickLine(axisType),
    selectMapTickValueToPositionInScale(axisType),
    selectAxisFontFace(axisType),
    selectAxisFontSize(axisType),
    partialApply(getTickMark)
  );

// Not happy about this split what depends on
// tick value (label and transform) from rest
function getTickMark(
  tickValue: any,
  tickPosition: (range: number) => Point,
  label: (x: any) => string,
  labelOffset: Point,
  line: Line,
  mapTickValueToPositionInScale: (value: any) => number,
  fontFace: string,
  fontSize: number
): TickMark {
  return {
    label: label(tickValue),
    transform: pointToTransform(
      tickPosition(mapTickValueToPositionInScale(tickValue))
    ),
    labelOffset,
    line,
    fontFace,
    fontSize
  };
}

const selectTimeAxisTickValues = createSelector(
  selectTimeScale,
  getTimeAxisTickValues
);

function getTimeAxisTickValues(scale: TimeScale) {
  return scale.ticks();
}

export const selectAxisTickValues = (axisType: AxisType) =>
  createOptionsBasedSelector<AxisType, any[]>({
    Resources: selectResources,
    Time: selectTimeAxisTickValues
  })(constSelector(axisType));

export const selectAxisTickMarks = (axisType: AxisType) =>
  createSelector(
    selectAxisTickValues(axisType),
    selectGetAxisTickMark(axisType),
    mapValues
  );
