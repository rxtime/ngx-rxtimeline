import { TimelineEvent } from './timeline-event';
import { Orientation } from './orientation';
import { TimelineView } from './view/timeline-view';

export class State {
  data: TimelineEvent[];
  orientation: Orientation;
  view: TimelineView;
}
