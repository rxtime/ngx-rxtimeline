import { getInverseBandScale } from './scale-utils';
import { Orientation } from './orientation';
import { BandScale, TimeScale } from './scale-types';
import { TimelineDragEvent } from './content/timeline-drag-event';
import { PositionedActivity } from './positioned-activity';

export function getDropActivity(
  bandScale: BandScale,
  timeScale: TimeScale,
  positionedActivities: PositionedActivity[],
  dragEvent: TimelineDragEvent,
  timeOrientation: Orientation
): PositionedActivity {
  const draggingActivity = getCurrentlyDraggedActivity(
    positionedActivities,
    dragEvent
  );

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
  dragEvent: TimelineDragEvent
): PositionedActivity {
  return (
    dragEvent &&
    positionedActivities.find(activity => activity.id === dragEvent.id)
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
