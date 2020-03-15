import { State } from './state';
import { Actions, ActionType } from './actions';
import { TimelineView } from '../view/timeline-view';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { identifier } from '../types';

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

    case ActionType.TimelineDragStarted: {
      return {
        ...state,
        dragEvent: createDragEvent(action.payload.id, action.payload.event)
      };
    }
    case ActionType.TimelineDragging: {
      return {
        ...state,
        dragEvent: updateDragEvent(state.dragEvent, action.payload)
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

export function createDragEvent(
  id: identifier,
  dragEvent: any
): TimelineDragEvent {
  return {
    id,
    dx: dragEvent.dx,
    dy: dragEvent.dy,
    x: dragEvent.x,
    y: dragEvent.y
  };
}

function updateDragEvent(dragEvent: TimelineDragEvent, event: any) {
  return {
    ...dragEvent,
    dx: dragEvent.dx + event.dx,
    dy: dragEvent.dy + event.dy,
    x: event.x,
    y: event.y
  };
}
