import {
  selectDragEvent,
  selectPositionedActivities,
  selectLastDraggedActivityId
} from '../store/state';
import { selectTimeOrientation } from '../options/selectors/options.selectors';
import { createSelector } from '../store-lib/selector/create-selector';
import { findActivity } from '../drag/drag-utils';
import { TimelineDragEvent } from '../drag/timeline-drag-event';
import { identifier } from '../core/types';
import { PositionedActivity } from './positioned-activity';
import { InverseBandScale, TimeScale } from '../scales/scale-types';
import { Orientation } from '../core/orientation';
import { selectBandScale, selectTimeScale } from '../scales/scale-selectors';
import { getInverseBandScale } from '../scales/scale-utils';
import { MemoizedSelector } from '../store-lib/selector/memoized-selector';

const selectDragEventId = createSelector(selectDragEvent, getDragEventId);

function getDragEventId(dragEvent: TimelineDragEvent): identifier {
  return dragEvent && dragEvent.id;
}

export const selectNonDraggedActivities = createSelector(
  selectPositionedActivities,
  selectDragEventId,
  getNonDraggedActivities
);

function getNonDraggedActivities(
  activities: PositionedActivity[],
  dragEventId: identifier
): PositionedActivity[] {
  return dragEventId
    ? activities.filter(activity => activity.id !== dragEventId)
    : activities;
}

export const selectCurrentlyDraggedActivity = createSelector(
  selectPositionedActivities,
  selectDragEventId,
  findActivity
);

function getCurrentlyDraggedActivityWithDraggedToResource(
  currentlyDraggedActivity: PositionedActivity,
  updatedResource: string
): PositionedActivity {
  return (
    currentlyDraggedActivity && {
      ...currentlyDraggedActivity,
      updatedResource
    }
  );
}

const selectInverseBandScale = createSelector(
  selectBandScale,
  getInverseBandScale
);

const selectDragPointInResourceAxis = createSelector(
  selectTimeOrientation,
  selectDragEvent,
  getDragPointInResourceAxis
);

function getDragPointInResourceAxis(
  timeOrientation: Orientation,
  dragEvent: TimelineDragEvent
): number {
  return (
    dragEvent &&
    (timeOrientation === Orientation.Vertical ? dragEvent.x : dragEvent.y)
  );
}

const selectDraggedToResource = createSelector(
  selectDragPointInResourceAxis,
  selectInverseBandScale,
  valueToResource
);

export function valueToResource(
  value: number,
  inverseBandScale: InverseBandScale
): string {
  return inverseBandScale(value);
}

const selectDeltaTimeForDrag = createSelector(
  selectTimeOrientation,
  selectDragEvent,
  getDeltaTimeForDrag
);

function getDeltaTimeForDrag(
  timeOrientation: Orientation,
  dragEvent: TimelineDragEvent
): number {
  return (
    dragEvent &&
    (timeOrientation === Orientation.Vertical ? dragEvent.dy : dragEvent.dx)
  );
}

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

function shiftTimeByRangeValue(
  time: Date,
  timeScale: TimeScale,
  rangeValue: number
): Date {
  return timeScale.invert(timeScale(time) + rangeValue);
}

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

function updateActivityForDrag(
  positionedActivity: PositionedActivity,
  updatedStart: Date,
  updatedFinish: Date,
  updatedResource: string
): PositionedActivity {
  return (
    positionedActivity && {
      ...positionedActivity,
      updatedStart,
      updatedFinish,
      updatedResource
    }
  );
}

export const selectLastDraggedActivity = createSelector(
  selectPositionedActivities,
  selectLastDraggedActivityId,
  findActivity
);
