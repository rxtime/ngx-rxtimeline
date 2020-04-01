import { View } from '../view/view';
import { TimelineDragEvent } from '../drag/timeline-drag-event';
import { createSliceSelector } from '../store-lib/selector/slice-selector';
import { PositionedActivity } from '../activity/positioned-activity';
import { Identifier } from '../core/identifiable';
import { defaultOptions, CompleteOptions } from '../options/options';

export interface State {
  view: View;
  options: CompleteOptions;
  positionedActivities: PositionedActivity[];
  lastDraggedActivityId: Identifier;
  dragEvent: TimelineDragEvent;
  zoomEvent: any;
  selectedId: Identifier;
  hoveredId: Identifier;
}

const initialView = new View([null, null]);

export const initialState: State = {
  view: initialView,
  options: defaultOptions,
  positionedActivities: [],
  lastDraggedActivityId: null,
  dragEvent: null,
  zoomEvent: null,
  selectedId: null,
  hoveredId: null
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

export const selectSelectedId = createSliceSelector(
  (state: State) => state.selectedId
);

export const selectHoveredId = createSliceSelector(
  (state: State) => state.hoveredId
);
