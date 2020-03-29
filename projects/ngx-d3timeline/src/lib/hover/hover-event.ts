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

export function hoverEventComparator(x: HoverEvent, y: HoverEvent) {
  return x.id === y.id && x.action === y.action;
}
