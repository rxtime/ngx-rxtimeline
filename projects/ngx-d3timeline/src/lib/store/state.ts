import { TimelineEvent } from '../timeline-event';
import { EventRectangleDragEvent } from '../content/event-rectangle-drag-event';
import { TimelineView } from '../view/timeline-view';
import { TimeScale, BandScale } from '../scale-types';
import { AxisOrientations } from '../axis-orientations';
import { Orientation } from '../orientation';

export interface State {
  data: TimelineEvent[];
  dragEvent: EventRectangleDragEvent;
  axisOrientations: AxisOrientations;
  view: TimelineView;
  timeScale: TimeScale;
  bandScale: BandScale;
}

const initialAxisOrientations = { time: null, resource: null };

export const initialState: State = {
  data: [],
  dragEvent: null,
  axisOrientations: initialAxisOrientations,
  view: new TimelineView({ width: 1, height: 1, margin: 0 }),
  timeScale: null,
  bandScale: null
};
