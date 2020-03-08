import { TimelineEvent } from './timeline-event';

export interface DraggedTimelineEvent extends TimelineEvent {
  dx: number;
  dy: number;
  x: number;
  y: number;
}

const initialDraggedTimelineEvent: Omit<
  DraggedTimelineEvent,
  keyof TimelineEvent
> = {
  dx: null,
  dy: null,
  x: null,
  y: null
};

export function initialiseDraggedTimelineEvent(
  timelineEvent: TimelineEvent
): DraggedTimelineEvent {
  return { ...timelineEvent, ...initialDraggedTimelineEvent };
}
