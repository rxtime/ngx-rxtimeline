import { createSelector } from '../store-lib/selector/create-selector';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  getTickMarkTopLeft,
  getTickMark,
  getTickMarks
} from './tick-mark-utils';
import {
  selectOrientedTimeScale,
  selectOrientedBandScale
} from '../scales/scale-selectors';
import { getTimeAxisTickMarkRenderer } from './time-axis-tick-mark-renderer';
import { getResourceAxisTickMarkRenderer } from './resource-axis-tick-mark-renderer';

const selectTickMarkTopLeft = createSelector(selectViewTopLeft, viewTopLeft =>
  getTickMarkTopLeft.bind(null, viewTopLeft)
);

const selectTickMark = createSelector(selectTickMarkTopLeft, tickMarkTopLeft =>
  getTickMark.bind(null, tickMarkTopLeft)
);

export const selectResourceAxisTickMarkRenderer = createSelector(
  selectOrientedBandScale,
  getResourceAxisTickMarkRenderer
);

export const selectTimeAxisTickMarkRenderer = createSelector(
  selectOrientedTimeScale,
  getTimeAxisTickMarkRenderer
);

export const selectResourceAxisTickMarks = createSelector(
  selectTickMark,
  selectResourceAxisTickMarkRenderer,
  getTickMarks
);

export const selectTimeAxisTickMarks = createSelector(
  selectTickMark,
  selectTimeAxisTickMarkRenderer,
  getTickMarks
);
