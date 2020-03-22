import { createSelector } from '../store-lib/selector/create-selector';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  getTickMarkTopLeft,
  getTickMark,
  getTickMarks,
  getTimeAxisTickValues,
  getResourceAxisTickValues
} from './tick-mark-utils';
import {
  selectOrientedTimeScale,
  selectOrientedBandScale,
  selectTimeScale,
  selectBandScale
} from '../scales/scale-selectors';
import { getTimeAxisTickMarkRenderer } from './time-axis-tick-mark-renderer';
import { getResourceAxisTickMarkRenderer } from './resource-axis-tick-mark-renderer';

const selectTickMarkTopLeft = createSelector(selectViewTopLeft, viewTopLeft =>
  getTickMarkTopLeft.bind(null, viewTopLeft)
);

const selectResourceAxisTickMarkRenderer = createSelector(
  selectOrientedBandScale,
  getResourceAxisTickMarkRenderer
);

const selectTimeAxisTickMarkRenderer = createSelector(
  selectOrientedTimeScale,
  getTimeAxisTickMarkRenderer
);

const selectResourceAxisTickMark = createSelector(
  selectTickMarkTopLeft,
  selectResourceAxisTickMarkRenderer,
  (tickMarkTopLeft, renderer) =>
    getTickMark.bind(null, tickMarkTopLeft, renderer)
);

const selectTimeAxisTickMark = createSelector(
  selectTickMarkTopLeft,
  selectTimeAxisTickMarkRenderer,
  (tickMarkTopLeft, renderer) =>
    getTickMark.bind(null, tickMarkTopLeft, renderer)
);

const selectResourceAxisTickValues = createSelector(
  selectBandScale,
  getResourceAxisTickValues
);

const selectTimeAxisTickValues = createSelector(
  selectTimeScale,
  getTimeAxisTickValues
);

export const selectResourceAxisTickMarks = createSelector(
  selectResourceAxisTickValues,
  selectResourceAxisTickMark,
  getTickMarks
);

export const selectTimeAxisTickMarks = createSelector(
  selectTimeAxisTickValues,
  selectTimeAxisTickMark,
  getTickMarks
);
