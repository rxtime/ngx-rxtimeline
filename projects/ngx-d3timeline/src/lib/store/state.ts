import { TimelineEvent } from '../timeline-event';
import { TimelineView } from '../view/timeline-view';
import { AxisOrientations } from '../axis-orientations';
import { EventRectangleDragEvent } from '../content/event-rectangle-drag-event';

export interface State {
  view: TimelineView;
  axisOrientations: AxisOrientations;
  data: TimelineEvent[];
  dragEvent: EventRectangleDragEvent;
}

const initialAxisOrientations = { time: null, resource: null };
const initialView = new TimelineView([null, null]);

export const initialState: State = {
  view: initialView,
  axisOrientations: initialAxisOrientations,
  data: [],
  dragEvent: null
};
