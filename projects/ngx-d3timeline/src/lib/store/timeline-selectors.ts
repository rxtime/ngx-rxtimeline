import { createSelector } from '../selector/memoized-selector';
import {
  selectData,
  selectView,
  selectResourceOrientation,
  selectTimeOrientation,
  selectZoomEvent
} from './state'; // TODO use barelling?
import { configureBandScale, rescaleTime } from '../scale-utils';

export const selectBandScale = createSelector(
  [selectData, selectView, selectResourceOrientation],
  configureBandScale
);

export const selectTimeScale = createSelector(
  [selectData, selectView, selectTimeOrientation, selectZoomEvent],
  rescaleTime
);
