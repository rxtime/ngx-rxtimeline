import { TimelineEvent } from '../timeline-event';
import { Orientation } from '../orientation';
import { identifier } from '../types';
import { EventRectangle } from '../content/content';

export interface Action {
  type: string;
  payload?: any;
}

export enum ActionType {
  DataChanged = 'Data Changed',
  OrientationChanged = 'Orientation Changed',
  ViewChanged = 'View Changed',
  Zoomed = 'Zoomed',
  TimelineDragStart = 'Timeline Drag Start',
  TimelineDrag = 'Timeline Drag',
  TimelineDragEnd = 'Timeline Drag End'
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

export class TimelineDragStartAction implements Action {
  readonly type = ActionType.TimelineDragStart;
  constructor(public payload: identifier) {}
}

export class TimelineDragAction implements Action {
  readonly type = ActionType.TimelineDrag;
  constructor(public payload: { eventRectangle: EventRectangle; event: any }) {}
}

export class TimelineDragEndAction implements Action {
  readonly type = ActionType.TimelineDragEnd;
  constructor(public payload: identifier) {}
}

export type Actions =
  | DataChangedAction
  | OrientationChangedAction
  | ViewChangedAction
  | ZoomedAction
  | TimelineDragStartAction
  | TimelineDragAction
  | TimelineDragEndAction;
