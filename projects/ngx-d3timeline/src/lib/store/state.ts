import { Activity } from '../activity';
import { TimelineView } from '../view/timeline-view';
import { TimeScale, BandScale } from '../scale-types';
import { AxisOrientations } from '../axis-orientations';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { createSliceSelector } from '../selector/slice-selector';

export interface State {
  view: TimelineView;
  axisOrientations: AxisOrientations;
  activities: Activity[];
  dragEvent: TimelineDragEvent;
  zoomEvent: any;
}

const initialAxisOrientations = { time: null, resource: null };
const initialView = new TimelineView([null, null]);

export const initialState: State = {
  view: initialView,
  axisOrientations: initialAxisOrientations,
  activities: [],
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
export const selectActivities = createSliceSelector(
  (state: State) => state.activities
);
export const selectZoomEvent = createSliceSelector(
  (state: State) => state.zoomEvent
);
export const selectDragEvent = createSliceSelector(
  (state: State) => state.dragEvent
);
