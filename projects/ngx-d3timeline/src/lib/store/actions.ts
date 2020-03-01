import { TimelineEvent } from '../timeline-event';
import { Orientation } from '../orientation';

export interface Action {
  type: string;
  payload?: any;
}

export enum ActionType {
  DataChanged = 'Data Changed',
  OrientationChanged = 'Orientation Changed',
  ViewChanged = 'View Changed'
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

export type Actions =
  | DataChangedAction
  | OrientationChangedAction
  | ViewChangedAction;
