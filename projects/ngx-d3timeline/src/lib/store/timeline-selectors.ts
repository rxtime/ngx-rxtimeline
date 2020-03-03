import { createSelector } from '../selector/memoized-selector';
import {
  selectData,
  selectView,
  selectResourceOrientation,
  selectTimeOrientation,
  selectZoomEvent
} from './state'; // TODO use barelling?
import {
  configureBandScale,
  configureTimeScale,
  rescaleTime
} from '../scale-util';

export const selectBandScale = createSelector(
  [selectData, selectView, selectResourceOrientation],
  configureBandScale
);

const selectOriginalTimeScale = createSelector(
  [selectData, selectView, selectTimeOrientation],
  configureTimeScale
);

export const selectTimeScale = createSelector(
  [selectOriginalTimeScale, selectTimeOrientation, selectZoomEvent],
  rescaleTime
);
