import { TimelineEvent } from './timeline-event';
import { Orientation } from './orientation';
import { TimelineView } from './view/timeline-view';

export class State {
  data: TimelineEvent[];
  timelineOrientation: Orientation;
  view: TimelineView;
}
