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

const selectDeltaTimeForDrag = createSelector(
  selectTimeOrientation,
  selectDragEvent,
  getDeltaTimeForDrag
);

const selectCurrentlyDraggedUpdatedStart = createSelector(
  selectCurrentlyDraggedActivity,
  activity => activity && activity.updatedStart
);

const selectCurrentlyDraggedUpdatedFinish = createSelector(
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
  selectTimeShiftedForDragEvent(selectCurrentlyDraggedUpdatedStart),
  selectTimeShiftedForDragEvent(selectCurrentlyDraggedUpdatedFinish),
  selectDraggedToSeries,
  updateActivityForDrag
);
