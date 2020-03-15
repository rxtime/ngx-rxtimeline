import { getInverseBandScale } from './scale-utils';
import { Orientation } from './orientation';
import { Activity } from './activity';
import { BandScale, TimeScale } from './scale-types';
import { TimelineDragEvent } from './content/timeline-drag-event';

export function getDropActivity(
  bandScale: BandScale,
  timeScale: TimeScale,
  activities: Activity[],
  dragEvent: TimelineDragEvent,
  timeOrientation: Orientation
) {
  const draggingActivity = getDraggingActivity(activities, dragEvent);

  return (
    draggingActivity && {
      ...draggingActivity,
      series: getDropActivitySeries(bandScale, dragEvent, timeOrientation),
      ...shiftedTimesForDraggingActivity(
        draggingActivity,
        timeOrientation,
        dragEvent,
        timeScale
      )
    }
  );
}

export function getDraggingActivity(
  activities: Activity[],
  dragEvent: TimelineDragEvent
): Activity {
  return dragEvent && activities.find(activity => activity.id === dragEvent.id);
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
  draggingActivity: Activity,
  timeOrientation: Orientation,
  dragEvent: TimelineDragEvent,
  timeScale: TimeScale
) {
  const deltaTime = getDeltaTime(timeOrientation, dragEvent);

  const shiftedActivityStart = timeScale(draggingActivity.start) + deltaTime;
  const shiftedActivityFinish = timeScale(draggingActivity.finish) + deltaTime;

  return {
    start: timeScale.invert(shiftedActivityStart),
    finish: timeScale.invert(shiftedActivityFinish)
  };
}

function getDeltaTime(
  timeOrientation: Orientation,
  dragEvent: TimelineDragEvent
) {
  return timeOrientation === Orientation.Vertical ? dragEvent.dy : dragEvent.dx;
}
