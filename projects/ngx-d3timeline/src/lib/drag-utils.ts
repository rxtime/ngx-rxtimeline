import { getInverseBandScale } from './scale-utils';
import { Orientation } from './orientation';
import { BandScale, TimeScale, InverseBandScale } from './scale-types';
import { TimelineDragEvent } from './content/timeline-drag-event';
import { PositionedActivity } from './positioned-activity';
import { identifier } from './types';
import { Point, origin } from './point';

export function getDropActivity(
  bandScale: BandScale,
  timeScale: TimeScale,
  positionedActivities: PositionedActivity[],
  dragEvent: TimelineDragEvent,
  timeOrientation: Orientation
): PositionedActivity {
  const draggingActivity =
    dragEvent &&
    getCurrentlyDraggedActivity(positionedActivities, dragEvent.id);

  return (
    draggingActivity && {
      ...draggingActivity,
      updatedSeries: getDropActivitySeries(
        bandScale,
        dragEvent,
        timeOrientation
      ),
      ...shiftedTimesForDraggingActivity(
        draggingActivity,
        timeOrientation,
        dragEvent,
        timeScale
      )
    }
  );
}

export function getCurrentlyDraggedActivity(
  positionedActivities: PositionedActivity[],
  dragEventId: identifier
): PositionedActivity {
  return (
    dragEventId &&
    positionedActivities.find(activity => activity.id === dragEventId)
  );
}

function getDropActivitySeries(
  bandScale: BandScale,
  dragEvent: TimelineDragEvent,
  timeOrientation: Orientation
) {
  const invert = getInverseBandScale(bandScale);
  return dragEvent && timeOrientation === Orientation.Vertical
    ? invert(dragEvent.x)
    : invert(dragEvent.y);
}

function shiftedTimesForDraggingActivity(
  positionedActivity: PositionedActivity,
  timeOrientation: Orientation,
  dragEvent: TimelineDragEvent,
  timeScale: TimeScale
) {
  const deltaTime = getDeltaTime(timeOrientation, dragEvent);

  const shiftedActivityStart =
    timeScale(positionedActivity.updatedStart) + deltaTime;
  const shiftedActivityFinish =
    timeScale(positionedActivity.updatedFinish) + deltaTime;

  return {
    updatedStart: timeScale.invert(shiftedActivityStart),
    updatedFinish: timeScale.invert(shiftedActivityFinish)
  };
}

function getDeltaTime(
  timeOrientation: Orientation,
  dragEvent: TimelineDragEvent
) {
  return timeOrientation === Orientation.Vertical ? dragEvent.dy : dragEvent.dx;
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
