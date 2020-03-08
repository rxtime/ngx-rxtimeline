import { scaleBandInvert } from './scale-util';
import { State } from './store/state';
import { Orientation } from './orientation';
import { TimelineEvent } from '../public-api';
import { DraggedTimelineEvent } from './dragged-timeline-event';

export function getDropTimelineEvent(state: State): DraggedTimelineEvent {
  const draggingTimelineEvent = getDraggingTimelineEvent(state);

  return (
    draggingTimelineEvent && {
      ...draggingTimelineEvent,
      series: getDropEventSeries(state),
      ...shiftedTimesForDraggingTimelineEvent(draggingTimelineEvent, state)
    }
  );
}

export function getDraggingTimelineEvent(state: State): DraggedTimelineEvent {
  return state.dragEvent && state.data.find(d => d.id === state.dragEvent.id);
}

function getDropEventSeries(state: State) {
  const invert = scaleBandInvert(state.bandScale);
  return state.dragEvent && state.axisOrientations.time === Orientation.Vertical
    ? invert(state.dragEvent.x)
    : invert(state.dragEvent.y);
}

function shiftedTimesForDraggingTimelineEvent(
  draggingTimelineEvent: TimelineEvent,
  state: State
) {
  const deltaTime = getDeltaTime(state);

  const shiftedEventStart =
    state.timeScale(draggingTimelineEvent.start) + deltaTime;
  const shiftedEventFinish =
    state.timeScale(draggingTimelineEvent.finish) + deltaTime;

  return {
    start: state.timeScale.invert(shiftedEventStart),
    finish: state.timeScale.invert(shiftedEventFinish)
  };
}

function getDeltaTime(state: State) {
  return state.axisOrientations.time === Orientation.Vertical
    ? state.dragEvent.dy
    : state.dragEvent.dx;
}
