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
  EventRectangleDragStart = 'Event Rectangle Drag Start',
  EventRectangleDrag = 'Event Rectangle Drag',
  EventRectangleDragEnd = 'Event Rectangle Drag End'
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

export class EventRectangleDragStartAction implements Action {
  readonly type = ActionType.EventRectangleDragStart;
  constructor(public payload: identifier) {}
}

export class EventRectangleDragAction implements Action {
  readonly type = ActionType.EventRectangleDrag;
  constructor(public payload: { eventRectangle: EventRectangle; event: any }) {}
}

export class EventRectangleDragEndAction implements Action {
  readonly type = ActionType.EventRectangleDragEnd;
  constructor(public payload: identifier) {}
}

export type Actions =
  | DataChangedAction
  | OrientationChangedAction
  | ViewChangedAction
  | EventRectangleDragStartAction
  | EventRectangleDragAction
  | EventRectangleDragEndAction;
