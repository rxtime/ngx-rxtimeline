import { State, initialState } from './state';
import { Actions, ActionType } from './actions';
import { View } from '../view/view';
import { TimelineDragEvent } from '../drag/timeline-drag-event';
import { identifier } from '../core/types';
import { initialisePositionedActivity } from '../activity/positioned-activity';
import { defaultOptions, CompleteOptions } from '../options/options';

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.ActivitiesChanged: {
      return {
        ...state,
        positionedActivities: action.payload.map(initialisePositionedActivity)
      };
    }

    case ActionType.OptionsChanged: {
      const options: CompleteOptions = { ...defaultOptions, ...action.payload };

      return {
        ...state,
        options
      };
    }

    case ActionType.ViewChanged: {
      return { ...state, view: new View(action.payload) };
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
      const activities = state.positionedActivities.map(activity =>
        activity.id === action.payload.id ? action.payload : activity
      );
      return {
        ...state,
        positionedActivities: activities,
        dragEvent: null,
        lastDraggedActivityId: action.payload.id
      };
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
