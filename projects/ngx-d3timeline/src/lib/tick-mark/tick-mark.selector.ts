import { createSelector } from '../store-lib/selector/create-selector';
import {
  getTickMark,
  getTimeAxisTickValues,
  getResourceAxisTickValues,
  getTickMarkPosition
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
  selectResourceAxisTickLineOffset,
  selectTimeAxisTickLineOffset,
  selectResourceAxisFontFace,
  selectResourceAxisFontSize,
  selectTimeAxisFontFace,
  selectTimeAxisFontSize
} from '../options/selectors/axis-options.selectors';
import { partial4 } from '../core/partial';

export const selectTickMarkPositionFunc = createSelector(
  selectViewTopLeft,
  viewTopLeft => getTickMarkPosition.bind(null, viewTopLeft)
);

const selectResourceAxisTickMarkRenderer = createSelector(
  selectOrientedBandScale,
  selectResourceAxisTickLineOffset,
  getResourceAxisTickMarkRenderer
);

const selectTimeAxisTickMarkRenderer = createSelector(
  selectOrientedTimeScale,
  selectTimeAxisTickLineOffset,
  getTimeAxisTickMarkRenderer
);

const selectResourceAxisTickMarkFunc = createSelector(
  selectTickMarkPositionFunc,
  selectResourceAxisTickMarkRenderer,
  selectResourceAxisFontFace,
  selectResourceAxisFontSize,
  partial4(getTickMark)
);

const selectTimeAxisTickMarkFunc = createSelector(
  selectTickMarkPositionFunc,
  selectTimeAxisTickMarkRenderer,
  selectTimeAxisFontFace,
  selectTimeAxisFontSize,
  partial4(getTickMark)
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
