import { createSelector } from '../selector/create-selector';
import {
  selectActivities,
  selectView,
  selectResourceOrientation,
  selectTimeOrientation,
  selectZoomEvent,
  selectDragEvent
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

export const tempStateSelector = createSelector(
  selectTimeScale,
  selectBandScale,
  selectActivities,
  selectDragEvent,
  selectTimeOrientation,
  (timeScale, bandScale, activities, dragEvent, timeOrientation) => ({
    timeScale,
    bandScale,
    activities,
    dragEvent,
    timeOrientation
  })
);
