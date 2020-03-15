import { Activity } from '../activity';
import { Orientation } from '../orientation';
import { identifier } from '../types';
import { ActivityRectangle } from '../content/activity-rectangle';

export interface Action {
  type: string;
  payload?: any;
}

export enum ActionType {
  ActivitiesChanged = 'Activities Changed',
  OrientationChanged = 'Orientation Changed',
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
  constructor(
    public payload: { activityRectangle: ActivityRectangle; event: any }
  ) {}
}

export class TimelineDraggingAction implements Action {
  readonly type = ActionType.TimelineDragging;
  constructor(
    public payload: { activityRectangle: ActivityRectangle; event: any }
  ) {}
}

export class TimelineDragEndedAction implements Action {
  readonly type = ActionType.TimelineDragEnded;
  constructor(public payload: Activity) {}
}

export type Actions =
  | ActivitiesChangedAction
  | OrientationChangedAction
  | ViewChangedAction
  | ZoomedAction
  | TimelineDragStartedAction
  | TimelineDraggingAction
  | TimelineDragEndedAction;
