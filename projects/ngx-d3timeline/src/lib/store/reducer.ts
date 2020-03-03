import { State } from './state';
import { Actions, ActionType } from './actions';
import { TimelineView } from '../view/timeline-view';
import {
  rescaleTime,
  configureBandScale,
  configureTimeScale
} from '../scale-util';
import { TimelineEvent } from '../timeline-event';
import { getDropTimelineEvent } from '../drag-util';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { EventRectangle } from '../content/event-rectangle';
import { Orientation } from '../orientation';
import { AxisOrientations } from '../axis-orientations';
import { flipOrientation } from '../orientation-utils';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.DataChanged: {
      return patchStateAndUpdateScales(state, { data: action.payload });
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
        timeScale: rescaleTime(
          state.data,
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
          action.payload.eventRectangle,
          action.payload.event
        )
      };
    }

    case ActionType.TimelineDragEnded: {
      const data = dropTimelineEventOnDragEnd(state);
      return { ...state, data, dragEvent: null };
    }

    default: {
      return state;
    }
  }
}

function dropTimelineEventOnDragEnd(state: State): TimelineEvent[] {
  const dropEvent = getDropTimelineEvent(state);
  return state.data.map(data => (data.id === dropEvent.id ? dropEvent : data));
}

function patchStateAndUpdateScales(state: State, patch: Partial<State>) {
  const patchedState = { ...state, ...patch };
  return {
    ...patchedState,
    timeScale: configureTimeScale(
      patchedState.data,
      patchedState.view,
      patchedState.axisOrientations.time
    ),
    bandScale: configureBandScale(
      patchedState.data,
      patchedState.view,
      patchedState.axisOrientations.resource
    )
  };
}

function setDragEvent(
  dragEvent: TimelineDragEvent,
  eventRectangle: EventRectangle,
  event: any
) {
  return {
    ...dragEvent,
    id: eventRectangle.id,
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
