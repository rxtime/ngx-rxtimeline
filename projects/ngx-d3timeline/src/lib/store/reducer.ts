import { State } from './state';
import { Actions, ActionType } from './actions';
import { TimelineView } from '../view/timeline-view';
import {
  rescaleTime,
  configureBandScale,
  configureTimeScale
} from '../scale-util';
import { TimelineEvent } from '../timeline-event';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { EventRectangle } from '../content/event-rectangle';
import { Orientation } from '../orientation';
import { AxisOrientations } from '../axis-orientations';
import { flipOrientation } from '../orientation-utils';
import {
  DraggedTimelineEvent,
  initialiseDraggedTimelineEvent
} from './dragged-timeline-event';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.DataChanged: {
      return patchStateAndUpdateScales(state, {
        data: initDraggedTimelineEvents(action.payload)
      });
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
      const data = dropTimelineEventOnDragEnd(state.data, state.dragEvent);
      return { ...state, data, dragEvent: { id: 1, x: 0, y: 0, dx: 0, dy: 0 } };
    }

    default: {
      return state;
    }
  }
}

function initDraggedTimelineEvents(
  timelineEvents: TimelineEvent[]
): DraggedTimelineEvent[] {
  return timelineEvents.map(initialiseDraggedTimelineEvent);
}

function dropTimelineEventOnDragEnd(
  data: DraggedTimelineEvent[],
  dragEvent: TimelineDragEvent
): DraggedTimelineEvent[] {
  return data.map(d =>
    d.id === dragEvent.id
      ? {
          ...d,
          dx: d.dx + dragEvent.dx,
          dy: d.dy + dragEvent.dy,
          x: dragEvent.x,
          y: dragEvent.y
        }
      : d
  );
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
