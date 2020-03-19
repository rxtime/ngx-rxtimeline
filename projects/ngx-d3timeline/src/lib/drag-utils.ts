import { Orientation } from './orientation';
import { TimeScale, InverseBandScale } from './scale-types';
import { TimelineDragEvent } from './content/timeline-drag-event';
import { PositionedActivity } from './positioned-activity';
import { identifier } from './types';
import { Point, origin } from './point';

export function getCurrentlyDraggedActivity(
  positionedActivities: PositionedActivity[],
  dragEventId: identifier
): PositionedActivity {
  return (
    dragEventId &&
    positionedActivities.find(activity => activity.id === dragEventId)
  );
}

export function updateActivityForDrag(
  positionedActivity: PositionedActivity,
  updatedStart: Date,
  updatedFinish: Date,
  updatedSeries: string
) {
  return (
    positionedActivity && {
      ...positionedActivity,
      updatedStart,
      updatedFinish,
      updatedSeries
    }
  );
}

export function shiftTimeByRangeValue(
  time: Date,
  timeScale: TimeScale,
  rangeValue: number
): Date {
  return timeScale.invert(timeScale(time) + rangeValue);
}

export function getDeltaTime(
  timeOrientation: Orientation,
  dragEvent: TimelineDragEvent
) {
  return (
    dragEvent &&
    (timeOrientation === Orientation.Vertical ? dragEvent.dy : dragEvent.dx)
  );
}

export function getDragEventOffset(dragEvent: TimelineDragEvent): Point {
  return dragEvent && { x: dragEvent.dx, y: dragEvent.dy };
}

export function getDragEventOffsetTime(
  dragEvent: TimelineDragEvent,
  timeOrientation: Orientation
): Point {
  return (
    dragEvent &&
    (timeOrientation === Orientation.Vertical
      ? { ...origin, y: dragEvent.dy }
      : { ...origin, x: dragEvent.dx })
  );
}

export function getDragPointInResourceAxis(
  timeOrientation: Orientation,
  dragEvent: TimelineDragEvent
) {
  return (
    dragEvent &&
    (timeOrientation === Orientation.Vertical ? dragEvent.x : dragEvent.y)
  );
}

export function valueToSeries(
  value: number,
  inverseBandScale: InverseBandScale
) {
  return inverseBandScale(value);
}

export function getNonDraggedActivities(
  activities: PositionedActivity[],
  dragEventId: identifier
): PositionedActivity[] {
  return dragEventId
    ? activities.filter(activity => activity.id !== dragEventId)
    : activities;
}

export function getDragEventId(dragEvent: TimelineDragEvent) {
  return dragEvent && dragEvent.id;
}

export function getCurrentlyDraggedActivityWithDraggedToSeries(
  currentlyDraggedActivity: PositionedActivity,
  updatedSeries: string
) {
  return (
    currentlyDraggedActivity && { ...currentlyDraggedActivity, updatedSeries }
  );
}
