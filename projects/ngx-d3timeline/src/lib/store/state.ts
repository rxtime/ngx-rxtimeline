import { TimelineEvent } from '../timeline-event';
import { TimelineView } from '../view/timeline-view';
import { TimeScale, BandScale } from '../scale-types';
import { AxisOrientations } from '../axis-orientations';
import { TimelineDragEvent } from '../content/timeline-drag-event';

export interface State {
  view: TimelineView;
  axisOrientations: AxisOrientations;
  data: TimelineEvent[];
  timeScale: TimeScale;
  bandScale: BandScale;
  dragEvent: TimelineDragEvent;
}

const initialAxisOrientations = { time: null, resource: null };
const initialView = new TimelineView([null, null]);

export const initialState: State = {
  view: initialView,
  axisOrientations: initialAxisOrientations,
  data: [],
  timeScale: null,
  bandScale: null,
  dragEvent: null
};
