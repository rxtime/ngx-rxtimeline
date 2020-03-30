import { identifier } from '../core/types';

export enum HoverAction {
  Hovered = 'Hovered',
  Unhovered = 'Unhovered'
}

export enum HoverSource {
  Resource = 'Resource',
  Activity = 'Activity'
}

export interface HoverEventArgs {
  id: identifier;
  action: HoverAction;
}

export interface HoverEvent extends HoverEventArgs {
  source: HoverSource;
}

export function hoverEventComparer(a: HoverEvent, b: HoverEvent) {
  return a.id === b.id && a.action === b.action;
}
