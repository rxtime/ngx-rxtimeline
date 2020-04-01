import { State, initialState } from './state';
import { Actions, ActionType } from './actions';
import { View } from '../view/view';
import { TimelineDragEvent } from '../drag/timeline-drag-event';
import { Identifier, updateOne } from '../core/identifiable';
import { initialisePositionedActivity } from '../activity/positioned-activity';
import { defaultOptions } from '../options/options';
import { mergeDeep } from '../core/object-utils';

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.ActivitiesChanged: {
      return {
        ...state,
        positionedActivities: action.payload.map(initialisePositionedActivity)
      };
    }

    case ActionType.OptionsChanged: {
      const options = mergeDeep(defaultOptions, action.payload);

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

    case ActionType.TimelineDragging: {
      return {
        ...state,
        dragEvent: updateDragEvent(state.dragEvent, action.payload)
      };
    }

    case ActionType.TimelineDragEnded: {
      const lastDraggedActivityId = action.payload && action.payload.id;
      return {
        ...state,
        positionedActivities: updateOne(
          state.positionedActivities,
          action.payload
        ),
        dragEvent: null,
        lastDraggedActivityId
      };
    }

    case ActionType.SelectedIdChanged: {
      return { ...state, selectedId: action.payload };
    }

    case ActionType.HoveredIdChanged: {
      return { ...state, hoveredId: action.payload };
    }

    default: {
      return state;
    }
  }
}

export function createDragEvent(
  id: Identifier,
  dragEvent: any
): TimelineDragEvent {
  return {
    id,
    ...dragEvent
  };
}

function updateDragEvent(
  dragEvent: TimelineDragEvent,
  payload: { id: Identifier; event: any }
) {
  return dragEvent
    ? {
        ...dragEvent,
        dx: dragEvent.dx + payload.event.dx,
        dy: dragEvent.dy + payload.event.dy,
        x: payload.event.x,
        y: payload.event.y
      }
    : createDragEvent(payload.id, payload.event);
}
