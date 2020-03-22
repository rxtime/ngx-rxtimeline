import { createSelector } from '../store-lib/selector/create-selector';
import {
  getAxis,
  getAxisLine,
  getAxisEndPoint,
  getTickGridLine
} from './axis-utils';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectResourceAxisTickMarks,
  selectTimeAxisTickMarks,
  selectTimeAxisTickValues,
  selectResourceAxisTickValues,
  selectTickMarkTopLeftFunc
} from '../tick-mark/tick-mark.selector';
import { Line } from '../core/line';
import {
  selectOrientedBandScale,
  selectOrientedTimeScale
} from '../scales/scale-selectors';
import { OrientedScale } from '../scales/oriented-scale';
import { Scale } from '../scales/scale-types';
import { mapValues } from '../core/transform-utils';

const selectAxisLine = createSelector(selectViewTopLeft, viewTopLeft =>
  getAxisLine.bind(null, viewTopLeft)
);

const selectResourceAxisTickValueToGridLineFunc = createSelector(
  selectTickMarkTopLeftFunc,
  selectOrientedBandScale,
  selectOrientedTimeScale,
  (tickMarkTopLeft, orientedScale, otherOrientedScale) =>
    getTickGridLine.bind(
      null,
      tickMarkTopLeft,
      orientedScale,
      otherOrientedScale
    )
);

const selectTimeAxisTickValueToGridLineFunc = createSelector(
  selectTickMarkTopLeftFunc,
  selectOrientedTimeScale,
  selectOrientedBandScale,
  (tickMarkTopLeft, orientedScale, otherOrientedScale) =>
    getTickGridLine.bind(
      null,
      tickMarkTopLeft,
      orientedScale,
      otherOrientedScale
    )
);

export const selectResourceAxisGridLines = createSelector(
  selectResourceAxisTickValues,
  selectResourceAxisTickValueToGridLineFunc,
  mapValues
);

const selectTimeAxisGridLines = createSelector(
  selectTimeAxisTickValues,
  selectTimeAxisTickValueToGridLineFunc,
  mapValues
);

const selectResourceAxisLine = createSelector(
  selectOrientedBandScale,
  selectAxisLine,
  axisLineFromOrientedScale
);

export const selectTimeAxisLine = createSelector(
  selectOrientedTimeScale,
  selectAxisLine,
  axisLineFromOrientedScale
);

export const selectResourceAxis = createSelector(
  selectResourceAxisLine,
  selectResourceAxisTickMarks,
  selectResourceAxisGridLines,
  getAxis
);

export const selectTimeAxis = createSelector(
  selectTimeAxisLine,
  selectTimeAxisTickMarks,
  selectTimeAxisGridLines,
  getAxis
);

function axisLineFromOrientedScale(
  orientedScale: OrientedScale<Scale>,
  line: (o: OrientedScale<Scale>) => Line
) {
  return line(orientedScale);
}
