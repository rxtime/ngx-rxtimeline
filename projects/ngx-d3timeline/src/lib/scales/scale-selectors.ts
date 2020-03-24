import { createSelector } from '../store-lib/selector/create-selector';
import {
  selectPositionedActivities,
  selectView,
  selectZoomEvent
} from '../store/state'; // TODO use barelling?
import { configureBandScale, rescaleTime } from './scale-utils';
import {
  selectResourceOrientation,
  selectTimeOrientation,
  selectResourceGap
} from '../options/options.selectors';
import { getOrientedScale } from './oriented-scale';

export const selectBandScale = createSelector(
  selectPositionedActivities,
  selectView,
  selectResourceOrientation,
  selectResourceGap,
  configureBandScale
);

export const selectTimeScale = createSelector(
  selectPositionedActivities,
  selectView,
  selectTimeOrientation,
  selectZoomEvent,
  rescaleTime
);

export const selectOrientedTimeScale = createSelector(
  selectTimeScale,
  selectTimeOrientation,
  getOrientedScale
);

export const selectOrientedBandScale = createSelector(
  selectBandScale,
  selectResourceOrientation,
  getOrientedScale
);
