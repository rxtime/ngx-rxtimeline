import { identifier } from '../core/types';
import {
  Activity,
  getActivityFromPositionedActivity
} from '../activity/activity';
import { PositionedActivity } from '../activity/positioned-activity';

export enum HoverAction {
  Hovered = 'Hovered',
  Unhovered = 'Unhovered'
}

export interface HoverEvent {
  id: identifier;
  action: HoverAction;
}

export function getHoveredActivity(
  hoverEvent: HoverEvent,
  hoveredPositionedActivity: PositionedActivity
): Activity {
  return (
    hoverEvent && getActivityFromPositionedActivity(hoveredPositionedActivity)
  );
}

export function hoverEventComparer(e1: HoverEvent, e2: HoverEvent) {
  return e1.id === e2.id && e1.action === e2.action;
}
