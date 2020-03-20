import {
  selectDragEvent,
  selectPositionedActivities,
  selectTimeOrientation,
  selectLastDraggedActivityId
} from '../../store/state';
import { createSelector } from '../../selector/create-selector';
import {
  findActivity,
  getDragPointInResourceAxis,
  valueToSeries,
  getNonDraggedActivities,
  getDragEventId,
  getCurrentlyDraggedActivityWithDraggedToSeries,
  getDeltaTimeForDrag,
  updateActivityForDrag,
  shiftTimeByRangeValue
} from '../../drag-utils';
import {
  selectBandScale,
  selectTimeScale
} from '../../store/timeline-selectors';
import { getInverseBandScale } from '../../scale-utils';
import { MemoizedSelector } from '../../selector/memoized-selector';

const selectDragEventId = createSelector(selectDragEvent, getDragEventId);

export const selectNonDraggedActivities = createSelector(
  selectPositionedActivities,
  selectDragEventId,
  getNonDraggedActivities
);

export const selectCurrentlyDraggedActivity = createSelector(
  selectPositionedActivities,
  selectDragEventId,
  findActivity
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

const selectDeltaTimeForDrag = createSelector(
  selectTimeOrientation,
  selectDragEvent,
  getDeltaTimeForDrag
);

const selectUpdatedStartForCurrentlyDraggedActivity = createSelector(
  selectCurrentlyDraggedActivity,
  activity => activity && activity.updatedStart
);

const selectUpdatedFinishForCurrentlyDraggedActivity = createSelector(
  selectCurrentlyDraggedActivity,
  activity => activity && activity.updatedFinish
);

const selectTimeShiftedForDragEvent = (selectTime: MemoizedSelector<Date>) =>
  createSelector(
    selectTime,
    selectTimeScale,
    selectDeltaTimeForDrag,
    shiftTimeByRangeValue
  );

export const selectCurrentlyDraggedActivityWithDraggedToSeries = createSelector(
  selectCurrentlyDraggedActivity,
  selectDraggedToSeries,
  getCurrentlyDraggedActivityWithDraggedToSeries
);

export const selectActivityUpdatedForDrag = createSelector(
  selectCurrentlyDraggedActivity,
  selectTimeShiftedForDragEvent(selectUpdatedStartForCurrentlyDraggedActivity),
  selectTimeShiftedForDragEvent(selectUpdatedFinishForCurrentlyDraggedActivity),
  selectDraggedToSeries,
  updateActivityForDrag
);

export const selectLastDraggedActivity = createSelector(
  selectPositionedActivities,
  selectLastDraggedActivityId,
  findActivity
);
