import { State } from './state';
import { Actions, ActionType } from './actions';
import { TimelineView } from '../view/timeline-view';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { ActivityRectangle } from '../content/activity-rectangle';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.ActivitiesChanged: {
      return { ...state, activities: action.payload };
    }

    case ActionType.OrientationChanged: {
      return {
        ...state,
        timeOrientation: action.payload
      };
    }

    case ActionType.ViewChanged: {
      return { ...state, view: new TimelineView(action.payload) };
    }

    case ActionType.Zoomed: {
      return {
        ...state,
        zoomEvent: action.payload
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
      const activities = state.activities.map(activity =>
        activity.id === action.payload.id ? action.payload : activity
      );
      return { ...state, activities, dragEvent: null };
    }

    default: {
      return state;
    }
  }
}

function setDragEvent(
  dragEvent: TimelineDragEvent,
  activityRectangle: ActivityRectangle,
  event: any
) {
  return {
    ...dragEvent,
    id: activityRectangle.id,
    dx: dragEvent.dx + event.dx,
    dy: dragEvent.dy + event.dy,
    x: event.x,
    y: event.y
  };
}
