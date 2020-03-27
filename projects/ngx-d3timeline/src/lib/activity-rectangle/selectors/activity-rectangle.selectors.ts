import { createSelector } from '../../store-lib/selector/create-selector';
import { selectDragEvent } from '../../store/state';
import {
  selectNonDraggedActivities,
  selectCurrentlyDraggedActivity,
  selectCurrentlyDraggedActivityWithDraggedToResource
} from '../../activity/activity.selectors';
import {
  createActivityRectangle,
  getMinBreadthToShowTitle,
  getShowTitle,
  getActivityTitleBreadthInTimeAxis
} from '../../content/content-utils';
import {
  getDragEventOffset,
  getDragEventOffsetTime
} from '../../drag/drag-utils';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { PositionedActivity } from '../../activity/positioned-activity';
import { ActivityRectangle } from '../activity-rectangle';
import { Point } from '../../core/point';
import { selectTransform } from './activity-rectangle-position.selectors';
import {
  selectRectWidth,
  selectRectHeight,
  selectRectBreadthInTimeAxis
} from './activity-rectangle-size.selectors';
import {
  selectTimeOrientation,
  selectActivityStrokeWidth,
  selectActivityDisableDrag
} from '../../options/selectors/options.selectors';
import {
  selectActivityFontFace,
  selectActivityFontSize
} from '../../options/selectors/options.selectors';
import { partial3, partial1, partial2, partial8 } from '../../core/partial';

const selectActivityTitleBreadthInTimeAxis = createSelector(
  selectTimeOrientation,
  selectActivityFontFace,
  selectActivityFontSize,
  partial3(getActivityTitleBreadthInTimeAxis)
);

const selectMinBreadthToShowLabel = createSelector(
  selectActivityTitleBreadthInTimeAxis,
  partial1(getMinBreadthToShowTitle)
);

const selectShowTitle = createSelector(
  selectRectBreadthInTimeAxis,
  selectMinBreadthToShowLabel,
  partial2(getShowTitle)
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
    selectActivityFontFace,
    selectActivityFontSize,
    selectActivityStrokeWidth,
    selectActivityDisableDrag,
    selectShowTitle,
    partial8(createActivityRectangle)
  );

export const selectNonDraggedActivityRectangles = createSelector(
  selectNonDraggedActivities,
  selectRectangle(),
  (activities, positionedActivityToRectangle) =>
    activities.map(activity => positionedActivityToRectangle(activity))
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
