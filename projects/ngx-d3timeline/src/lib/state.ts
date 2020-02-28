import { TimelineEvent } from './timeline-event';
import { TimelineView } from './view/timeline-view';
import { AxisOrientations } from './axis-orientations';

export class State {
  data: TimelineEvent[];
  orientations: AxisOrientations;
  view: TimelineView;
}
