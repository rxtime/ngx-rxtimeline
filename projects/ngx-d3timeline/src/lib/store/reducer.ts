import { State } from './state';
import { Actions, ActionType } from './actions';
import { TimelineView } from '../view/timeline-view';
import { Orientation } from '../orientation';
import { AxisOrientations } from '../axis-orientations';
import { flipOrientation } from '../utils';
import { EventRectangleDragEvent } from '../content/event-rectangle-drag-event';
import { EventRectangle } from '../content/content';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.DataChanged: {
      return { ...state, data: action.payload };
    }

    case ActionType.OrientationChanged: {
      return {
        ...state,
        axisOrientations: setAxisOrientations(action.payload)
      };
    }

    case ActionType.ViewChanged: {
      return { ...state, view: new TimelineView(action.payload) };
    }

    case ActionType.EventRectangleDragStart: {
      return {
        ...state,
        dragEvent: {
          id: action.payload,
          dx: 0,
          dy: 0
        }
      };
    }

    case ActionType.EventRectangleDrag: {
      return {
        ...state,
        dragEvent: setDragEvent(
          state.dragEvent,
          action.payload.eventRectangle,
          action.payload.event
        )
      };
    }

    case ActionType.EventRectangleDragEnd: {
      return { ...state, dragEvent: null };
    }

    default: {
      return state;
    }
  }
}

function setAxisOrientations(timeOrientation: Orientation): AxisOrientations {
  const resourceOrientation = flipOrientation(timeOrientation);
  return { time: timeOrientation, resource: resourceOrientation };
}

function setDragEvent(
  dragEvent: EventRectangleDragEvent,
  eventRectangle: EventRectangle,
  event: any
) {
  return {
    ...dragEvent,
    id: eventRectangle.id,
    dx: dragEvent && dragEvent.dx + event.dx,
    dy: dragEvent && dragEvent.dy + event.dy
  };
}
