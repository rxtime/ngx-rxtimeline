import {
  selectDragEvent,
  selectPositionedActivities,
  selectTimeOrientation
} from '../../store/state';
import { createSelector } from '../../selector/create-selector';
import {
  getCurrentlyDraggedActivity,
  getDragPointInResourceAxis,
  valueToSeries,
  getNonDraggedActivities,
  getDragEventId,
  getCurrentlyDraggedActivityWithDraggedToSeries
} from '../../drag-utils';
import { selectBandScale } from '../../store/timeline-selectors';
import { getInverseBandScale } from '../../scale-utils';

const selectDragEventId = createSelector(selectDragEvent, getDragEventId);

export const selectNonDraggedActivities = createSelector(
  selectPositionedActivities,
  selectDragEventId,
  getNonDraggedActivities
);

export const selectCurrentlyDraggedActivity = createSelector(
  selectPositionedActivities,
  selectDragEventId,
  getCurrentlyDraggedActivity
);

const selectInverseBandScale = createSelector(
  selectBandScale,
  getInverseBandScale
);

const selectDragPointInResourceAxis = createSelector(
  selectTimeOrientation,
  selectDragEvent,
  getDragPointInResourceAxis
);

const selectDraggedToSeries = createSelector(
  selectDragPointInResourceAxis,
  selectInverseBandScale,
  valueToSeries
);

export const selectCurrentlyDraggedActivityWithDraggedToSeries = createSelector(
  selectCurrentlyDraggedActivity,
  selectDraggedToSeries,
  getCurrentlyDraggedActivityWithDraggedToSeries
);
