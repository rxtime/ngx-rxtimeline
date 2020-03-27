import { createSelector } from '../store-lib/selector/create-selector';
import { getAxis, getAxisLine, getTickGridLine } from './axis-utils';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectResourceAxisTickMarks,
  selectTimeAxisTickMarks,
  selectTimeAxisTickValues,
  selectResourceAxisTickValues,
  selectTickMarkPositionFunc
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
} from '../options/selectors/axis-options.selectors';
import { partial1, partial3 } from '../core/partial';

const selectAxisLine = createSelector(selectViewTopLeft, partial1(getAxisLine));

const selectGetResourceAxisGridLine = createSelector(
  selectTickMarkPositionFunc,
  selectOrientedBandScale,
  selectOrientedTimeScale,
  partial3(getTickGridLine)
);

const selectGetTimeAxisGridLine = createSelector(
  selectTickMarkPositionFunc,
  selectOrientedTimeScale,
  selectOrientedBandScale,
  partial3(getTickGridLine)
);

export const selectResourceAxisGridLines = createSelector(
  selectResourceAxisTickValues,
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
