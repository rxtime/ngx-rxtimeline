import {
  selectDragEvent,
  selectPositionedActivities,
  selectLastDraggedActivityId
} from '../store/state';
import { selectTimeOrientation } from '../options/options.selectors';
import { createSelector } from '../store-lib/selector/create-selector';
import {
  findActivity,
  getDragPointInResourceAxis,
  valueToResource,
  getNonDraggedActivities,
  getDragEventId,
  getCurrentlyDraggedActivityWithDraggedToResource,
  getDeltaTimeForDrag,
  updateActivityForDrag,
  shiftTimeByRangeValue
} from '../drag-utils';
import { selectBandScale, selectTimeScale } from '../store/timeline-selectors';
import { getInverseBandScale } from '../scale-utils';
import { MemoizedSelector } from '../store-lib/selector/memoized-selector';

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

const selectDraggedToResource = createSelector(
  selectDragPointInResourceAxis,
  selectInverseBandScale,
  valueToResource
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

export const selectCurrentlyDraggedActivityWithDraggedToResource = createSelector(
  selectCurrentlyDraggedActivity,
  selectDraggedToResource,
  getCurrentlyDraggedActivityWithDraggedToResource
);

export const selectActivityUpdatedForDrag = createSelector(
  selectCurrentlyDraggedActivity,
  selectTimeShiftedForDragEvent(selectUpdatedStartForCurrentlyDraggedActivity),
  selectTimeShiftedForDragEvent(selectUpdatedFinishForCurrentlyDraggedActivity),
  selectDraggedToResource,
  updateActivityForDrag
);

export const selectLastDraggedActivity = createSelector(
  selectPositionedActivities,
  selectLastDraggedActivityId,
  findActivity
);
