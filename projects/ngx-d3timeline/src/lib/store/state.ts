import { TimelineEvent } from '../timeline-event';
import { EventRectangleDragEvent } from '../content/event-rectangle-drag-event';
import { TimelineView } from '../view/timeline-view';
import { TimeScale, BandScale } from '../scale-types';
import { AxisOrientations } from '../axis-orientations';
import { createSliceSelector } from './slice-selector';
import { Orientation } from '../orientation';

export interface State {
  view: TimelineView;
  axisOrientations: AxisOrientations;
  data: TimelineEvent[];
  timeScale: TimeScale;
  bandScale: BandScale;
  dragEvent: EventRectangleDragEvent;
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

export const selectTimeOrientation = createSliceSelector(
  (state: State) => Orientation.Vertical
); // temp as orientation not populated in store
export const selectResourceOrientation = createSliceSelector(
  (state: State) => Orientation.Horizontal
); // temp as orientation not populated in store
export const selectView = createSliceSelector((state: State) => state.view);
export const selectData = createSliceSelector((state: State) => state.data);
