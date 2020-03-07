import { TimelineEvent } from '../timeline-event';
import { TimelineDragEvent } from '../content/timeline-drag-event';

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

export function draggingTimelineEvent(
  draggedTimelineEvent: DraggedTimelineEvent,
  dragEvent: TimelineDragEvent
): DraggedTimelineEvent {
  let offset = {
    dx: draggedTimelineEvent.dx + dragEvent.dx,
    dy: draggedTimelineEvent.dy + dragEvent.dy
  };

  return { ...draggedTimelineEvent, ...offset };
}
