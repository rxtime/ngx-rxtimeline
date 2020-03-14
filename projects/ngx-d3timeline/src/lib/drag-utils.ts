import { getInverseBandScale } from './scale-utils';
import { State } from './store/state';
import { Orientation } from './orientation';
import { Activity } from './activity';

export function getDropActivity(state: State) {
  const draggingTimelineActivity = getDraggingActivity(state);

  return (
    draggingTimelineActivity && {
      ...draggingTimelineActivity,
      series: getDropActivitySeries(state),
      ...shiftedTimesForDraggingActivity(draggingTimelineActivity, state)
    }
  );
}

export function getDraggingActivity(state: State): Activity {
  return state.dragEvent && state.data.find(d => d.id === state.dragEvent.id);
}

function getDropActivitySeries(state: State) {
  const invert = getInverseBandScale(state.bandScale);
  return state.dragEvent && state.axisOrientations.time === Orientation.Vertical
    ? invert(state.dragEvent.x)
    : invert(state.dragEvent.y);
}

function shiftedTimesForDraggingActivity(
  draggingActivity: Activity,
  state: State
) {
  const deltaTime = getDeltaTime(state);

  const shiftedActivityStart =
    state.timeScale(draggingActivity.start) + deltaTime;
  const shiftedActivityFinish =
    state.timeScale(draggingActivity.finish) + deltaTime;

  return {
    start: state.timeScale.invert(shiftedActivityStart),
    finish: state.timeScale.invert(shiftedActivityFinish)
  };
}

function getDeltaTime(state: State) {
  return state.axisOrientations.time === Orientation.Vertical
    ? state.dragEvent.dy
    : state.dragEvent.dx;
}
