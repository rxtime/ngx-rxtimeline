import { TimelineEvent } from './timeline-event';
import { Orientation } from './orientation';
import { TimelineView } from './view/timeline-view';
import { EventRectangleDragEvent } from './content/event-rectangle-drag-event';

export class State {
  data: TimelineEvent[];
  axisOrientations: {
    timeOrientation: Orientation;
    resourceOrientation: Orientation;
  };
  view: TimelineView;
  dragEvent: EventRectangleDragEvent;
}
