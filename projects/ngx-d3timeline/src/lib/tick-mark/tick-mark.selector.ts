import { createSelector } from '../store-lib/selector/create-selector';
import {
  getTickMark,
  getTimeAxisTickValues,
  getResourceAxisTickValues,
  getTickMarkTopLeft
} from './tick-mark-utils';
import {
  selectOrientedTimeScale,
  selectOrientedBandScale,
  selectTimeScale,
  selectBandScale
} from '../scales/scale-selectors';
import { getTimeAxisTickMarkRenderer } from './time-axis-tick-mark-renderer';
import { getResourceAxisTickMarkRenderer } from './resource-axis-tick-mark-renderer';
import { mapValues } from '../core/transform-utils';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectResourceAxisOptions,
  selectTimeAxisOptions
} from '../options/options.selectors';

export const selectTickMarkTopLeftFunc = createSelector(
  selectViewTopLeft,
  viewTopLeft => getTickMarkTopLeft.bind(null, viewTopLeft)
);

const selectResourceAxisTickMarkRenderer = createSelector(
  selectOrientedBandScale,
  selectResourceAxisOptions,
  getResourceAxisTickMarkRenderer
);

const selectTimeAxisTickMarkRenderer = createSelector(
  selectOrientedTimeScale,
  selectTimeAxisOptions,
  getTimeAxisTickMarkRenderer
);

const selectResourceAxisTickMarkFunc = createSelector(
  selectTickMarkTopLeftFunc,
  selectResourceAxisTickMarkRenderer,
  (tickMarkTopLeft, renderer) =>
    getTickMark.bind(null, tickMarkTopLeft, renderer)
);

const selectTimeAxisTickMarkFunc = createSelector(
  selectTickMarkTopLeftFunc,
  selectTimeAxisTickMarkRenderer,
  (tickMarkTopLeft, renderer) =>
    getTickMark.bind(null, tickMarkTopLeft, renderer)
);

export const selectResourceAxisTickValues = createSelector(
  selectBandScale,
  getResourceAxisTickValues
);

export const selectTimeAxisTickValues = createSelector(
  selectTimeScale,
  getTimeAxisTickValues
);

export const selectResourceAxisTickMarks = createSelector(
  selectResourceAxisTickValues,
  selectResourceAxisTickMarkFunc,
  mapValues
);

export const selectTimeAxisTickMarks = createSelector(
  selectTimeAxisTickValues,
  selectTimeAxisTickMarkFunc,
  mapValues
);
