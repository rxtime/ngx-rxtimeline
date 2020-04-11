import { createSelector } from '../store-lib/selector/create-selector';
import {
  selectViewTopLeft,
  selectVerticalMargin,
  selectMarginLeft
} from '../view/view.selectors';
import {
  selectResourceAxisTickMarks,
  selectTimeAxisTickMarks,
  selectTimeAxisTickValues,
  selectGetTickPosition
} from '../tick-mark/tick-mark.selector';
import { Line, createOrientedLine, createLine } from '../core/line';
import {
  selectOrientedBandScale,
  selectOrientedTimeScale,
  selectResources
} from '../scales/scale-selectors';
import { OrientedScale } from '../scales/oriented-scale';
import { Scale } from '../scales/scale-types';
import { mapValues } from '../core/transform-utils';
import {
  selectAxisShowGridLines,
  selectAxisShowAxisLine
} from '../options/selectors/axis-options.selectors';
import { partialApply } from '../core/function-utils';
import { TickMark } from '../tick-mark/tick-mark';
import { Axis, AxisType } from './axis';
import { Orientation, flipOrientation } from '../core/orientation';
import { Point } from '../core/point';
import {
  selectTimeOrientation,
  selectResourceOrientation
} from '../options/selectors/options.selectors';
import { createEnumSelector } from '../store-lib/selector/selector-utils';

const selectGetAxisLine = createSelector(
  selectViewTopLeft,
  partialApply(getAxisLine)
);

function getAxisLine(
  orientedScale: OrientedScale<Scale>,
  viewTopLeft: Point
): Line {
  return createLine(viewTopLeft, getAxisEndPoint(orientedScale, viewTopLeft));
}

function getAxisEndPoint(
  orientedScale: OrientedScale<Scale>,
  viewTopLeft: Point
): Point {
  return orientedScale.orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: getRangeLimit(orientedScale.scale) }
    : { ...viewTopLeft, x: getRangeLimit(orientedScale.scale) };
}

const selectGetMargin = createEnumSelector<Orientation, number>({
  Horizontal: selectMarginLeft,
  Vertical: selectVerticalMargin
});

const selectGetResourceAxisGridLine = createSelector(
  selectGetTickPosition,
  selectOrientedBandScale,
  selectOrientedTimeScale,
  selectGetMargin(selectTimeOrientation),
  partialApply(getTickGridLine)
);

const selectGetTimeAxisGridLine = createSelector(
  selectGetTickPosition,
  selectOrientedTimeScale,
  selectOrientedBandScale,
  selectGetMargin(selectResourceOrientation),
  partialApply(getTickGridLine)
);

function getTickGridLine(
  tickValue: any,
  tickPosition: (o: Orientation, range: number) => Point,
  orientedScale: OrientedScale<Scale>,
  otherOrientedScale: OrientedScale<Scale>,
  margin: number
): Line {
  return createOrientedLine(
    tickPosition(orientedScale.orientation, orientedScale.scale(tickValue)),
    getGridLineLength(otherOrientedScale, margin),
    flipOrientation(orientedScale.orientation)
  );
}

function getGridLineLength(
  orientedScale: OrientedScale<Scale>,
  margin: number
) {
  return getRangeLimit(orientedScale.scale) - margin;
}

function getRangeLimit(scale: Scale): number {
  return scale.range()[1];
}

const selectResourceAxisGridLines = createSelector(
  selectResources,
  selectGetResourceAxisGridLine,
  mapValues
);

const selectTimeAxisGridLines = createSelector(
  selectTimeAxisTickValues,
  selectGetTimeAxisGridLine,
  mapValues
);

const selectResourceAxisLine = createSelector(
  selectAxisShowAxisLine(AxisType.Resources),
  selectOrientedBandScale,
  selectGetAxisLine,
  axisLineFromOrientedScale
);

const selectTimeAxisLine = createSelector(
  selectAxisShowAxisLine(AxisType.Time),
  selectOrientedTimeScale,
  selectGetAxisLine,
  axisLineFromOrientedScale
);

export const selectResourceAxis = createSelector(
  selectResourceAxisLine,
  selectResourceAxisTickMarks,
  selectAxisShowGridLines(AxisType.Resources),
  selectResourceAxisGridLines,
  selectResourceOrientation,
  getAxis
);

export const selectTimeAxis = createSelector(
  selectTimeAxisLine,
  selectTimeAxisTickMarks,
  selectAxisShowGridLines(AxisType.Time),
  selectTimeAxisGridLines,
  selectTimeOrientation,
  getAxis
);

function getAxis(
  line: Line,
  tickMarks: TickMark[],
  showGridLines: boolean,
  gridLines: Line[],
  orientation: Orientation
): Axis {
  return {
    line,
    tickMarks,
    showGridLines,
    gridLines,
    orientation
  };
}

function axisLineFromOrientedScale(
  showAxisLine: boolean,
  orientedScale: OrientedScale<Scale>,
  line: (o: OrientedScale<Scale>) => Line
) {
  return showAxisLine && line(orientedScale);
}
