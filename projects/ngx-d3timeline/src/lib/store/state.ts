import { View } from '../view/view';
import { TimelineDragEvent } from '../drag/timeline-drag-event';
import { createSliceSelector } from '../store-lib/selector/slice-selector';
import { PositionedActivity } from '../activity/positioned-activity';
import { identifier } from '../core/types';
import { defaultOptions, CompleteOptions } from '../options/options';
import { HoverEvent } from '../hover/hover-event';

export interface State {
  view: View;
  options: CompleteOptions;
  positionedActivities: PositionedActivity[];
  lastDraggedActivityId: identifier;
  dragEvent: TimelineDragEvent;
  zoomEvent: any;
  hoverEvent: HoverEvent;
}

const initialView = new View([null, null]);

export const initialState: State = {
  view: initialView,
  options: defaultOptions,
  positionedActivities: [],
  lastDraggedActivityId: null,
  dragEvent: null,
  zoomEvent: null,
  hoverEvent: null
};

export const selectOptions = createSliceSelector(
  (state: State) => state.options
);
export const selectView = createSliceSelector((state: State) => state.view);
export const selectPositionedActivities = createSliceSelector(
  (state: State) => state.positionedActivities
);
export const selectZoomEvent = createSliceSelector(
  (state: State) => state.zoomEvent
);
export const selectDragEvent = createSliceSelector(
  (state: State) => state.dragEvent
);

export const selectLastDraggedActivityId = createSliceSelector(
  (state: State) => state.lastDraggedActivityId
);

export const selectHoverEvent = createSliceSelector(
  (state: State) => state.hoverEvent
);
