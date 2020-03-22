import { createSelector } from '../store-lib/selector/create-selector';
import {
  selectResourceOrientation,
  selectTimeOrientation
} from '../options/options.selectors';
import { getAxis, getAxisLine } from './axis-utils';
import { selectBandScale, selectTimeScale } from '../scales/scale-selectors';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectResourceAxisTickMarks,
  selectTimeAxisTickMarks
} from '../tick-mark/tick-mark.selector';

export const selectAxisLine = createSelector(selectViewTopLeft, viewTopLeft =>
  getAxisLine.bind(null, viewTopLeft)
);

export const selectResourceAxis = createSelector(
  selectResourceAxisTickMarks,
  selectBandScale,
  selectResourceOrientation,
  selectAxisLine,
  getAxis
);

export const selectTimeAxis = createSelector(
  selectTimeAxisTickMarks,
  selectTimeScale,
  selectTimeOrientation,
  selectAxisLine,
  getAxis
);
