import { Activity } from '../activity/activity';
import { PositionedActivity } from '../activity/positioned-activity';
import { Options } from '../options';
import { identifier } from '../core/types';
import { Action } from '../store-lib/action';

export enum ActionType {
  ActivitiesChanged = 'Activities Changed',
  OptionsChanged = 'Options Changed',
  ViewChanged = 'View Changed',
  Zoomed = 'Zoomed',
  TimelineDragStarted = 'Timeline Drag Started',
  TimelineDragging = 'Timeline Dragging',
  TimelineDragEnded = 'Timeline Drag Ended'
}

export class ActivitiesChangedAction implements Action {
  readonly type = ActionType.ActivitiesChanged;
  constructor(public payload: Activity[]) {}
}

export class OptionsChangedAction implements Action {
  readonly type = ActionType.OptionsChanged;
  constructor(public payload: Options) {}
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
  constructor(public payload: { id: identifier; event: any }) {}
}

export class TimelineDraggingAction implements Action {
  readonly type = ActionType.TimelineDragging;
  constructor(public payload: any) {} // TODO payload: d3Drag.DragEvent
}

export class TimelineDragEndedAction implements Action {
  readonly type = ActionType.TimelineDragEnded;
  constructor(public payload: PositionedActivity) {}
}

export type Actions =
  | ActivitiesChangedAction
  | OptionsChangedAction
  | ViewChangedAction
  | ZoomedAction
  | TimelineDragStartedAction
  | TimelineDraggingAction
  | TimelineDragEndedAction;
