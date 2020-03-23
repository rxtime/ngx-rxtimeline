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

export function getHoveredActivityByType(
  hoverEvent: HoverEvent,
  hoveredPositionedActivity: PositionedActivity,
  action: HoverAction
): Activity {
  return (
    hoverEvent &&
    (hoverEvent.action === action
      ? getActivityFromPositionedActivity(hoveredPositionedActivity)
      : null)
  );
}
