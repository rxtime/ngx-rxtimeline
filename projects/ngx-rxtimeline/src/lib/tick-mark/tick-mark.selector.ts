import { createSelector } from '../store-lib/selector/create-selector';

import { selectResources } from '../scales/selectors/band-scale.selectors';
import { selectOrientedScale } from '../scales/selectors/scale-selectors';
import { selectTimeScale } from '../scales/selectors/time-scale.selectors';
import { getTimeAxisTickMarkRenderer } from './time-axis-tick-mark-renderer';
import { getResourceAxisTickMarkRenderer } from './resource-axis-tick-mark-renderer';
import { mapValues } from '../core/transform-utils';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectAxisTickLineOffset,
  selectAxisFontFace,
  selectAxisFontSize
} from '../options/selectors/axis-options.selectors';
import { partialApply } from '../core/function-utils';
import { TimeScale } from '../scales/scale-types';
import { Orientation, flipOrientation } from '../core/orientation';
import { Point, pointToTransform, origin } from '../core/point';
import { TickMarkRenderer } from './tick-mark-renderer';
import { TickMark } from './tick-mark';
import { createOrientedLine } from '../core/line';
import { AxisType } from '../axis/axis';
import { createEnumSelector } from '../store-lib/selector/selector-utils';
import { constSelector } from '../store-lib/selector/selector';

export const selectGetTickPosition = createSelector(
  selectViewTopLeft,
  viewTopLeft => getTickPosition.bind(null, viewTopLeft)
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

const selectResourceAxisTickMarkRenderer = createSelector(
  selectOrientedScale(AxisType.Resources),
  selectAxisTickLineOffset(AxisType.Resources),
  getResourceAxisTickMarkRenderer
);

const selectTimeAxisTickMarkRenderer = createSelector(
  selectOrientedScale(AxisType.Time),
  selectAxisTickLineOffset(AxisType.Time),
  getTimeAxisTickMarkRenderer
);

const selectGetResourceAxisTickMark = createSelector(
  selectGetTickPosition,
  selectResourceAxisTickMarkRenderer,
  selectAxisFontFace(AxisType.Resources),
  selectAxisFontSize(AxisType.Resources),
  partialApply(getTickMark)
);

const selectGetTimeAxisTickMark = createSelector(
  selectGetTickPosition,
  selectTimeAxisTickMarkRenderer,
  selectAxisFontFace(AxisType.Time),
  selectAxisFontSize(AxisType.Time),
  partialApply(getTickMark)
);

function getTickMark(
  tickValue: any,
  tickPosition: (o: Orientation, range: number) => Point,
  tickMarkRenderer: TickMarkRenderer,
  fontFace: string,
  fontSize: number
): TickMark {
  return {
    label: tickMarkRenderer.getTickLabel(tickValue),
    transform: pointToTransform(
      tickPosition(
        tickMarkRenderer.orientation,
        tickMarkRenderer.mapTickValueToPositionInScale(tickValue)
      )
    ),
    labelOffset: getTickLabelOffset(
      tickMarkRenderer.getTickLabelSpacing(),
      flipOrientation(tickMarkRenderer.orientation)
    ),
    line: getTickLine(
      tickMarkRenderer.tickLineOffset,
      flipOrientation(tickMarkRenderer.orientation)
    ),
    fontFace,
    fontSize
  };
}

function getTickLine(lineOffset: number, orientation: Orientation) {
  return lineOffset && createOrientedLine(origin, lineOffset, orientation);
}

function getTickLabelOffset(labelSpacing: number, orientation: Orientation) {
  return orientation === Orientation.Vertical
    ? { ...origin, y: labelSpacing }
    : { ...origin, x: labelSpacing };
}

const selectTimeAxisTickValues = createSelector(
  selectTimeScale,
  getTimeAxisTickValues
);

function getTimeAxisTickValues(scale: TimeScale) {
  return scale.ticks();
}

export const selectAxisTickValues = (axisType: AxisType) =>
  createEnumSelector<AxisType, any[]>({
    Resources: selectResources,
    Time: selectTimeAxisTickValues
  })(constSelector(axisType));

export const selectResourceAxisTickMarks = createSelector(
  selectAxisTickValues(AxisType.Resources),
  selectGetResourceAxisTickMark,
  mapValues
);

export const selectTimeAxisTickMarks = createSelector(
  selectAxisTickValues(AxisType.Time),
  selectGetTimeAxisTickMark,
  mapValues
);
