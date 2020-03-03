import { TimelineEvent } from '../timeline-event';
import { Orientation } from '../orientation';
import { identifier } from '../types';
import { EventRectangle } from '../content/event-rectangle';

export interface Action {
  type: string;
  payload?: any;
}

export enum ActionType {
  DataChanged = 'Data Changed',
  OrientationChanged = 'Orientation Changed',
  ViewChanged = 'View Changed',
  Zoomed = 'Zoomed',
  TimelineDragStarted = 'Timeline Drag Started',
  TimelineDragging = 'Timeline Dragging',
  TimelineDragEnded = 'Timeline Drag Ended'
}

export class DataChangedAction implements Action {
  readonly type = ActionType.DataChanged;
  constructor(public payload: TimelineEvent[]) {}
}

export class OrientationChangedAction implements Action {
  readonly type = ActionType.OrientationChanged;
  constructor(public payload: Orientation) {}
}

export class ViewChangedAction implements Action {
  readonly type = ActionType.ViewChanged;
  constructor(public payload: [number, number]) {}
}

export class ZoomedAction implements Action {
  readonly type = ActionType.Zoomed;
  constructor(public payload: any) {}
}

export class TimelineDragStartedAction implements Action {
  readonly type = ActionType.TimelineDragStarted;
  constructor(public payload: { eventRectangle: EventRectangle; event: any }) {}
}

export class TimelineDraggingAction implements Action {
  readonly type = ActionType.TimelineDragging;
  constructor(public payload: { eventRectangle: EventRectangle; event: any }) {}
}

export class TimelineDragEndedAction implements Action {
  readonly type = ActionType.TimelineDragEnded;
  constructor(public payload: identifier) {}
}

export type Actions =
  | DataChangedAction
  | OrientationChangedAction
  | ViewChangedAction
  | ZoomedAction
  | TimelineDragStartedAction
  | TimelineDraggingAction
  | TimelineDragEndedAction;
