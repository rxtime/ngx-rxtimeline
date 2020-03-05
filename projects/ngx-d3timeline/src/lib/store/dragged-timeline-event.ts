import { TimelineEvent } from '../timeline-event';
import { TimelineDragEvent } from '../content/timeline-drag-event';

export interface DraggedTimelineEvent {
  timelineEvent: TimelineEvent;
  dragEvent: TimelineDragEvent;
}
