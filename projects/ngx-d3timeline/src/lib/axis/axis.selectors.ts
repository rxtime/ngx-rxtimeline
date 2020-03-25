import { createSelector } from '../store-lib/selector/create-selector';
import { getAxis, getAxisLine, getTickGridLine } from './axis-utils';
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
import {
  selectResourceAxisShowGridLines,
  selectTimeAxisShowGridLines,
  selectTimeAxisShowAxisLines,
  selectResourceAxisShowAxisLine
} from '../options/axis-options.selectors';

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
  selectResourceAxisShowAxisLine,
  selectOrientedBandScale,
  selectAxisLine,
  axisLineFromOrientedScale
);

export const selectTimeAxisLine = createSelector(
  selectTimeAxisShowAxisLines,
  selectOrientedTimeScale,
  selectAxisLine,
  axisLineFromOrientedScale
);

export const selectResourceAxis = createSelector(
  selectResourceAxisLine,
  selectResourceAxisTickMarks,
  selectResourceAxisShowGridLines,
  selectResourceAxisGridLines,
  getAxis
);

export const selectTimeAxis = createSelector(
  selectTimeAxisLine,
  selectTimeAxisTickMarks,
  selectTimeAxisShowGridLines,
  selectTimeAxisGridLines,
  getAxis
);

function axisLineFromOrientedScale(
  showAxisLine: boolean,
  orientedScale: OrientedScale<Scale>,
  line: (o: OrientedScale<Scale>) => Line
) {
  return showAxisLine && line(orientedScale);
}
