import { createSelector } from '../store-lib/selector/create-selector';
import { getAxis, getAxisLine } from './axis-utils';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectResourceAxisTickMarks,
  selectTimeAxisTickMarks
} from '../tick-mark/tick-mark.selector';
import { Line } from '../core/line';
import {
  selectOrientedBandScale,
  selectOrientedTimeScale
} from '../scales/scale-selectors';
import { OrientedScale } from '../scales/oriented-scale';
import { Scale } from '../scales/scale-types';

const selectAxisLine = createSelector(selectViewTopLeft, viewTopLeft =>
  getAxisLine.bind(null, viewTopLeft)
);

export const selectResourceAxisLine = createSelector(
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
  getAxis
);

export const selectTimeAxis = createSelector(
  selectTimeAxisLine,
  selectTimeAxisTickMarks,
  getAxis
);

function axisLineFromOrientedScale(
  orientedScale: OrientedScale<Scale>,
  line: (o: OrientedScale<Scale>) => Line
) {
  return line(orientedScale);
}
