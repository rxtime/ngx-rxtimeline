import { createSelector } from '../store-lib/selector/create-selector';
import {
  getTickMark,
  getTimeAxisTickValues,
  getResourceAxisTickValues,
  getTickPosition
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

export const selectGetTickPosition = createSelector(
  selectViewTopLeft,
  viewTopLeft => getTickPosition.bind(null, viewTopLeft)
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

const selectGetResourceAxisTickMark = createSelector(
  selectGetTickPosition,
  selectResourceAxisTickMarkRenderer,
  selectResourceAxisFontFace,
  selectResourceAxisFontSize,
  partial4(getTickMark)
);

const selectGetTimeAxisTickMark = createSelector(
  selectGetTickPosition,
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
  selectGetResourceAxisTickMark,
  mapValues
);

export const selectTimeAxisTickMarks = createSelector(
  selectTimeAxisTickValues,
  selectGetTimeAxisTickMark,
  mapValues
);
