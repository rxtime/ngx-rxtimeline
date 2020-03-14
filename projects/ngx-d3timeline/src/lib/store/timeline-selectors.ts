import { createSelector } from '../selector/create-selector';
import {
  selectActivities,
  selectView,
  selectResourceOrientation,
  selectTimeOrientation,
  selectZoomEvent
} from './state'; // TODO use barelling?
import { configureBandScale, rescaleTime } from '../scale-utils';

export const selectBandScale = createSelector(
  selectActivities,
  selectView,
  selectResourceOrientation,
  configureBandScale
);

export const selectTimeScale = createSelector(
  selectActivities,
  selectView,
  selectTimeOrientation,
  selectZoomEvent,
  rescaleTime
);
