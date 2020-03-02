import { scaleBandInvert } from './scale-util';
import { State } from './store/state';
import { Orientation } from './orientation';
import { TimelineEvent } from '../public-api';

export function getDropTimelineEvent(state: State) {
  const draggedTimelineEvent = getDraggedTimelineEvent(state);

  return (
    draggedTimelineEvent && {
      ...draggedTimelineEvent,
      series: getDragEventSeries(state),
      ...shiftedTimesForDraggedTimelineEvent(draggedTimelineEvent, state)
    }
  );
}

export function getDraggedTimelineEvent(state: State): TimelineEvent {
  return state.dragEvent && state.data.find(d => d.id === state.dragEvent.id);
}

function getDragEventSeries(state: State) {
  const invert = scaleBandInvert(state.bandScale);
  return state.dragEvent && state.axisOrientations.time === Orientation.Vertical
    ? invert(state.dragEvent.x)
    : invert(state.dragEvent.y);
}

function shiftedTimesForDraggedTimelineEvent(
  draggedTimelineEvent: TimelineEvent,
  state: State
) {
  const deltaTime = getDeltaTime(state);

  const shiftedEventStart =
    state.timeScale(draggedTimelineEvent.start) + deltaTime;
  const shiftedEventFinish =
    state.timeScale(draggedTimelineEvent.finish) + deltaTime;

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
