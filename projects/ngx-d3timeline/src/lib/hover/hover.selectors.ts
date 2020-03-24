import { createSelector } from '../store-lib/selector/create-selector';
import { selectHoveredEvent, selectPositionedActivities } from '../store/state';
import { findActivity } from '../drag/drag-utils';
import { HoverAction, getHoveredActivityByType } from './hover-event';

const selectHoveredId = createSelector(
  selectHoveredEvent,
  hoverEvent => hoverEvent && hoverEvent.id
);

const selectHoveredPositionedActivity = createSelector(
  selectPositionedActivities,
  selectHoveredId,
  findActivity
);

export const selectHoveredActivity = (type: HoverAction) =>
  createSelector(
    selectHoveredEvent,
    selectHoveredPositionedActivity,
    (hoverEvent, activity) =>
      getHoveredActivityByType(hoverEvent, activity, type)
  );
