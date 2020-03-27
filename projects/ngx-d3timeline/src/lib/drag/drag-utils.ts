import { PositionedActivity } from '../activity/positioned-activity';
import { identifier } from '../core/types';

export function findActivity(
  positionedActivities: PositionedActivity[],
  dragEventId: identifier
): PositionedActivity {
  return (
    dragEventId &&
    positionedActivities.find(activity => activity.id === dragEventId)
  );
}
