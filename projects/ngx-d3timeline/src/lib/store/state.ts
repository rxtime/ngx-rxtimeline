import { Activity } from '../activity';
import { TimelineView } from '../view/timeline-view';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { createSliceSelector } from '../selector/slice-selector';
import { Orientation } from '../orientation';
import { flipOrientation } from '../orientation-utils';

export interface State {
  view: TimelineView;
  timeOrientation: Orientation;
  activities: Activity[];
  dragEvent: TimelineDragEvent;
  zoomEvent: any;
}

const initialView = new TimelineView([null, null]);

export const initialState: State = {
  view: initialView,
  timeOrientation: null,
  activities: [],
  dragEvent: null,
  zoomEvent: null
};

export const selectTimeOrientation = createSliceSelector(
  (state: State) => state.timeOrientation
);
export const selectResourceOrientation = createSliceSelector((state: State) =>
  flipOrientation(state.timeOrientation)
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
