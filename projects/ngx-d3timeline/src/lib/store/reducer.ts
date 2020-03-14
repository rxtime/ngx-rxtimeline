import { State } from './state';
import { Actions, ActionType } from './actions';
import { TimelineView } from '../view/timeline-view';
import {
  rescaleTime,
  configureBandScale,
  configureTimeScale
} from '../scale-utils';
import { Activity } from '../activity';
import { getDropActivity } from '../drag-utils';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { ActivityRectangle } from '../content/activity-rectangle';
import { Orientation } from '../orientation';
import { AxisOrientations } from '../axis-orientations';
import { flipOrientation } from '../orientation-utils';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.ActivitiesChanged: {
      return patchStateAndUpdateScales(state, { activities: action.payload });
    }

    case ActionType.OrientationChanged: {
      return patchStateAndUpdateScales(state, {
        axisOrientations: setAxisOrientations(action.payload)
      });
    }

    case ActionType.ViewChanged: {
      return patchStateAndUpdateScales(state, {
        view: new TimelineView(action.payload)
      });
    }

    case ActionType.Zoomed: {
      return {
        ...state,
        zoomEvent: action.payload,
        timeScale: rescaleTime(
          state.activities,
          state.view,
          state.axisOrientations.time,
          action.payload
        )
      };
    }

    case ActionType.TimelineDragStarted:
    case ActionType.TimelineDragging: {
      return {
        ...state,
        dragEvent: setDragEvent(
          state.dragEvent,
          action.payload.activityRectangle,
          action.payload.event
        )
      };
    }

    case ActionType.TimelineDragEnded: {
      const activities = dropActivityOnDragEnd(state);
      return { ...state, activities, dragEvent: null };
    }

    default: {
      return state;
    }
  }
}

function dropActivityOnDragEnd(state: State): Activity[] {
  const dropActivity = getDropActivity(state);
  return state.activities.map(activity =>
    activity.id === dropActivity.id ? dropActivity : activity
  );
}

function patchStateAndUpdateScales(state: State, patch: Partial<State>) {
  const patchedState = { ...state, ...patch };
  return {
    ...patchedState,
    timeScale: configureTimeScale(
      patchedState.activities,
      patchedState.view,
      patchedState.axisOrientations.time
    ),
    bandScale: configureBandScale(
      patchedState.activities,
      patchedState.view,
      patchedState.axisOrientations.resource
    )
  };
}

function setDragEvent(
  dragEvent: TimelineDragEvent,
  activityRectangle: ActivityRectangle,
  event: any
) {
  return {
    ...dragEvent,
    id: activityRectangle.id,
    dx: dragEvent && dragEvent.dx + event.dx,
    dy: dragEvent && dragEvent.dy + event.dy,
    x: event.x,
    y: event.y
  };
}

function setAxisOrientations(timeOrientation: Orientation): AxisOrientations {
  const resourceOrientation = flipOrientation(timeOrientation);
  return { time: timeOrientation, resource: resourceOrientation };
}
