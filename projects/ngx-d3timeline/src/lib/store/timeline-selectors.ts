import { createSelector } from '../selector/create-selector';
import {
  selectPositionedActivities,
  selectView,
  selectResourceOrientation,
  selectTimeOrientation,
  selectZoomEvent,
  selectDragEvent
} from './state'; // TODO use barelling?
import { configureBandScale, rescaleTime } from '../scale-utils';

export const selectBandScale = createSelector(
  selectPositionedActivities,
  selectView,
  selectResourceOrientation,
  configureBandScale
);

export const selectTimeScale = createSelector(
  selectPositionedActivities,
  selectView,
  selectTimeOrientation,
  selectZoomEvent,
  rescaleTime
);

export const tempStateSelector = createSelector(
  selectTimeScale,
  selectBandScale,
  selectPositionedActivities,
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
