import {
  selectDragEvent,
  selectPositionedActivities,
  selectLastDraggedActivityId,
  selectSelectedId,
  selectHoveredId
} from '../store/state';
import { selectTimeOrientation } from '../options/selectors/options.selectors';
import { createSelector } from '../store-lib/selector/create-selector';
import { findIdentifiable, Identifier } from '../core/identifiable';
import { TimelineDragEvent } from '../drag/timeline-drag-event';
import { PositionedActivity } from './positioned-activity';
import { InverseBandScale, TimeScale } from '../scales/scale-types';
import { Orientation } from '../core/orientation';
import { selectBandScale, selectTimeScale } from '../scales/scale-selectors';
import { getInverseBandScale } from '../scales/scale-utils';
import { MemoizedSelector } from '../store-lib/selector/memoized-selector';
import { selectGetTypeZIndex } from '../options/selectors/type-options.selectors';

const selectDragEventId = createSelector(selectDragEvent, getDragEventId);

function getDragEventId(dragEvent: TimelineDragEvent): Identifier {
  return dragEvent && dragEvent.id;
}

const selectSortedPositionedActivities = createSelector(
  selectPositionedActivities,
  selectGetTypeZIndex,
  getSortedPositionedActivities
);

function getSortedPositionedActivities(
  activities: PositionedActivity[],
  zIndex: (type: string) => number
): PositionedActivity[] {
  // TODO: this mutates the array
  return activities.sort((a, b) => zIndex(a.type) - zIndex(b.type));
}

export const selectNonDraggedActivities = createSelector(
  selectSortedPositionedActivities,
  selectDragEventId,
  getNonDraggedActivities
);

function getNonDraggedActivities(
  activities: PositionedActivity[],
  dragEventId: Identifier
): PositionedActivity[] {
  return dragEventId
    ? activities.filter(activity => activity.id !== dragEventId)
    : activities;
}

export const selectCurrentlyDraggedActivity = createSelector(
  selectPositionedActivities,
  selectDragEventId,
  findIdentifiable
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

function valueToResource(
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
  findIdentifiable
);

export const selectSelectedActivity = createSelector(
  selectPositionedActivities,
  selectSelectedId,
  findIdentifiable
);

export const selectHoveredActivity = createSelector(
  selectPositionedActivities,
  selectHoveredId,
  findIdentifiable
);
