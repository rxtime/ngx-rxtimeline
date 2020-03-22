import { createSelector } from '../store-lib/selector/create-selector';
import {
  selectResourceOrientation,
  selectTimeOrientation
} from '../options/options.selectors';
import { getAxis, getAxisLine } from './axis-utils';
import { selectBandScale, selectTimeScale } from '../scales/scale-selectors';
import { getResourceAxisTickMarkRenderer } from '../tick-mark/resource-axis-tick-mark-renderer';
import { getTimeAxisTickMarkRenderer } from '../tick-mark/time-axis-tick-mark-renderer';
import { selectViewTopLeft } from '../view/view.selectors';

export const selectAxisLine = createSelector(selectViewTopLeft, viewTopLeft =>
  getAxisLine.bind(null, viewTopLeft)
);

export const selectResourceAxis = createSelector(
  selectBandScale,
  selectResourceOrientation,
  selectViewTopLeft,
  selectAxisLine,
  getAxis.bind(null, getResourceAxisTickMarkRenderer)
);

export const selectTimeAxis = createSelector(
  selectTimeScale,
  selectTimeOrientation,
  selectViewTopLeft,
  selectAxisLine,
  getAxis.bind(null, getTimeAxisTickMarkRenderer)
);
