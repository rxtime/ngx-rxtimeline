import { createSelector } from '../store-lib/selector/create-selector';
import { selectViewTopLeft, selectMargin } from '../view/view.selectors';
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
  selectResourceAxisShowGridLines,
  selectTimeAxisShowGridLines,
  selectTimeAxisShowAxisLines,
  selectResourceAxisShowAxisLine
} from '../options/selectors/axis-options.selectors';
import { partialApply } from '../core/function-utils';
import { TickMark } from '../tick-mark/tick-mark';
import { Axis } from './axis';
import { Orientation, flipOrientation } from '../core/orientation';
import { Point } from '../core/point';
import {
  selectTimeOrientation,
  selectResourceOrientation
} from '../options/selectors/options.selectors';

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

const selectGetResourceAxisGridLine = createSelector(
  selectGetTickPosition,
  selectOrientedBandScale,
  selectOrientedTimeScale,
  selectMargin,
  partialApply(getTickGridLine)
);

const selectGetTimeAxisGridLine = createSelector(
  selectGetTickPosition,
  selectOrientedTimeScale,
  selectOrientedBandScale,
  selectMargin,
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
  selectResourceAxisShowAxisLine,
  selectOrientedBandScale,
  selectGetAxisLine,
  axisLineFromOrientedScale
);

const selectTimeAxisLine = createSelector(
  selectTimeAxisShowAxisLines,
  selectOrientedTimeScale,
  selectGetAxisLine,
  axisLineFromOrientedScale
);

export const selectResourceAxis = createSelector(
  selectResourceAxisLine,
  selectResourceAxisTickMarks,
  selectResourceAxisShowGridLines,
  selectResourceAxisGridLines,
  selectResourceOrientation,
  getAxis
);

export const selectTimeAxis = createSelector(
  selectTimeAxisLine,
  selectTimeAxisTickMarks,
  selectTimeAxisShowGridLines,
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
