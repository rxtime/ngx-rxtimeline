import { identifier } from '../core/types';
import {
  Activity,
  getActivityFromPositionedActivity
} from '../activity/activity';
import { PositionedActivity } from '../activity/positioned-activity';

export enum HoverType {
  Hovered = 'Hovered',
  Unhovered = 'Unhovered'
}

export interface HoverEvent {
  id: identifier;
  type: HoverType;
}

export function getHoveredActivityByType(
  hoverEvent: HoverEvent,
  hoveredPositionedActivity: PositionedActivity,
  type: HoverType
): Activity {
  return (
    hoverEvent &&
    (hoverEvent.type === type
      ? getActivityFromPositionedActivity(hoveredPositionedActivity)
      : null)
  );
}
