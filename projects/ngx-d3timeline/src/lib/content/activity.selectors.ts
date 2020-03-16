import { selectDragEvent, selectPositionedActivities } from '../store/state';
import { createSelector } from '../selector/create-selector';

const selectDragEventId = createSelector(
  selectDragEvent,
  dragEvent => dragEvent && dragEvent.id
);

export const selectNonDraggedActivities = createSelector(
  selectPositionedActivities,
  selectDragEventId,
  (activities, dragEventId) =>
    dragEventId
      ? activities.filter(activity => activity.id !== dragEventId)
      : activities
);
