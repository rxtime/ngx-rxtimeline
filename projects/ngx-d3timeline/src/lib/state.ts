import { TimelineEvent } from './timeline-event';
import { Orientations } from './orientations';
import { TimelineView } from './view/timeline-view';

export class State {
  data: TimelineEvent[];
  orientations: Orientations;
  view: TimelineView;
}
