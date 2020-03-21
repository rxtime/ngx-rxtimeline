import { createSelector } from '../../selector/create-selector';
import { selectDragEvent } from '../../store/state';
import {
  selectNonDraggedActivities,
  selectCurrentlyDraggedActivity,
  selectCurrentlyDraggedActivityWithDraggedToResource
} from './activity.selectors';
import {
  createActivityRectangle,
  getMinHeightToShowLabel,
  getShowTitle
} from '../content-utils';
import { getDragEventOffset, getDragEventOffsetTime } from '../../drag-utils';
import { MemoizedSelector } from '../../selector/memoized-selector';
import { PositionedActivity } from '../../positioned-activity';
import { ActivityRectangle } from '../activity-rectangle';
import { Point } from '../../point';
import { selectTransform } from './activity-rectangle-position.selectors';
import {
  selectRectWidth,
  selectRectHeight,
  selectRectBreadthInTimeAxis
} from './activity-rectangle-size.selectors';
import {
  selectTimeOrientation,
  selectActivityFontSize
} from '../../options.selectors';

const selectMinHeightToShowLabel = createSelector(
  selectActivityFontSize,
  getMinHeightToShowLabel
);

const selectShowTitle = createSelector(
  selectRectBreadthInTimeAxis,
  selectMinHeightToShowLabel,
  (rectBreadthInTimeAxis, minHeightToShowLabel) =>
    getShowTitle.bind(null, rectBreadthInTimeAxis, minHeightToShowLabel)
);

const selectDragEventOffset = createSelector(
  selectDragEvent,
  getDragEventOffset
);

const selectDragEventOffsetTime = createSelector(
  selectDragEvent,
  selectTimeOrientation,
  getDragEventOffsetTime
);

const selectRectangle = (selectOffset?: MemoizedSelector<Point>) =>
  createSelector(
    selectTransform(selectOffset),
    selectRectWidth,
    selectRectHeight,
    selectActivityFontSize,
    selectShowTitle,
    (transform, width, height, fontSize, showTitle) =>
      createActivityRectangle.bind(
        null,
        transform,
        width,
        height,
        fontSize,
        showTitle
      )
  );

export const selectNonDraggedActivityRectangles = createSelector(
  selectNonDraggedActivities,
  selectRectangle(),
  (activities, positionedActivityToRectangle) =>
    activities.map(positionedActivityToRectangle)
);

export const selectDraggingActivityRectangle = createSelector(
  selectCurrentlyDraggedActivity,
  selectRectangle(selectDragEventOffset),
  activityToRectangle
);

export const selectDraggedFromRectangle = createSelector(
  selectCurrentlyDraggedActivity,
  selectRectangle(),
  activityToRectangle
);

export const selectDraggedToRectangle = createSelector(
  selectCurrentlyDraggedActivityWithDraggedToResource,
  selectRectangle(selectDragEventOffsetTime),
  activityToRectangle
);

function activityToRectangle(
  activity: PositionedActivity,
  getActivityRectangle: (a: PositionedActivity) => ActivityRectangle
) {
  return activity && getActivityRectangle(activity);
}
