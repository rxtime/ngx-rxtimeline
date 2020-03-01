import { TimelineEvent } from '../timeline-event';
import { EventRectangleDragEvent } from '../content/event-rectangle-drag-event';
import { TimelineView } from '../view/timeline-view';
import { TimeScale, BandScale } from '../scale-types';
import { AxisOrientations } from '../axis-orientations';
import { createSliceSelector } from './slice-selector';

export interface State {
  view: TimelineView;
  axisOrientations: AxisOrientations;
  data: TimelineEvent[];
  dragEvent: EventRectangleDragEvent;
  zoomEvent: any; // TODO type
}

const initialAxisOrientations = { time: null, resource: null };
const initialView = new TimelineView([null, null]);

export const initialState: State = {
  view: initialView,
  axisOrientations: initialAxisOrientations,
  data: [],
  dragEvent: null,
  zoomEvent: null
};

export const selectTimeOrientation = createSliceSelector(
  (state: State) => state.axisOrientations.time
);
export const selectResourceOrientation = createSliceSelector(
  (state: State) => state.axisOrientations.resource
);
export const selectView = createSliceSelector((state: State) => state.view);
export const selectData = createSliceSelector((state: State) => state.data);
export const selectZoomEvent = createSliceSelector(
  (state: State) => state.zoomEvent
);
