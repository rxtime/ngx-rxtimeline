import { createSelector } from './memoized-selector';
import {
  selectData,
  selectView,
  selectResourceOrientation,
  selectTimeOrientation,
  selectZoomEvent
} from './state'; // TODO use barelling?
import {
  configureBandScale,
  rescaleTime,
  configureTimeScale
} from '../scale-utils';

export const selectBandScale = createSelector(
  [selectData, selectView, selectResourceOrientation],
  configureBandScale
);

export const selectUnscaledTimeScale = createSelector(
  [selectData, selectView, selectTimeOrientation],
  configureTimeScale
);

export const selectTimeScale = createSelector(
  [selectUnscaledTimeScale, selectTimeOrientation, selectZoomEvent],
  rescaleTime
);
