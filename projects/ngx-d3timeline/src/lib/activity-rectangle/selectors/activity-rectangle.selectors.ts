import { createSelector } from '../../store-lib/selector/create-selector';
import { selectDragEvent } from '../../store/state';
import {
  selectNonDraggedActivities,
  selectCurrentlyDraggedActivity,
  selectCurrentlyDraggedActivityWithDraggedToResource
} from '../../activity/activity.selectors';

import { Point, origin } from '../../core/point';
import { TimelineDragEvent } from '../../drag/timeline-drag-event';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { PositionedActivity } from '../../activity/positioned-activity';
import { ActivityRectangle } from '../activity-rectangle';
import { selectGetActivityTransform } from './activity-rectangle-position.selectors';
import {
  selectGetRectWidth,
  selectGetRectHeight,
  selectGetRectBreadthInTimeAxis
} from './activity-rectangle-size.selectors';
import {
  selectTimeOrientation,
  selectStrokeWidth
} from '../../options/selectors/options.selectors';
import {
  selectGetActivityDisableDrag,
  selectGetActivityPadding,
  selectGetActivityFontFace,
  selectGetActivityFontSize
} from '../../options/selectors/activity-options.selectors';
import { partialApply } from '../../core/function-utils';
import { Orientation } from '../../core/orientation';
import { getTextWidth } from '../../core/text-utils';

const selectGetActivityTitleBreadthInTimeAxis = createSelector(
  selectTimeOrientation,
  selectGetActivityFontFace,
  selectGetActivityFontSize,
  partialApply(getActivityTitleBreadthInTimeAxis)
);

function getActivityTitleBreadthInTimeAxis(
  positionedActivity: PositionedActivity,
  timeOrientation: Orientation,
  fontFace: (type: string) => string,
  fontSize: (type: string) => number
): number {
  return timeOrientation === Orientation.Vertical
    ? fontSize(positionedActivity.type)
    : getTextWidth(
        positionedActivity.type,
        fontFace(positionedActivity.type),
        fontSize(positionedActivity.type)
      );
}

const selectGetMinBreadthToShowLabel = createSelector(
  selectGetActivityTitleBreadthInTimeAxis,
  selectGetActivityPadding,
  selectStrokeWidth,
  partialApply(getMinBreadthToShowTitle)
);

function getMinBreadthToShowTitle(
  positionedActivity: PositionedActivity,
  activityTitleBreadthInTimeAxis: (p: PositionedActivity) => number,
  activityPadding: (type: string) => number,
  strokeWidth: number
) {
  return (
    activityTitleBreadthInTimeAxis(positionedActivity) +
    activityPadding(positionedActivity.type) +
    2 * strokeWidth
  );
}

const selectGetShowTitle = createSelector(
  selectGetRectBreadthInTimeAxis,
  selectGetMinBreadthToShowLabel,
  partialApply(getShowTitle)
);

function getShowTitle(
  positionedActivity: PositionedActivity,
  rectBreadthInTimeAxis: (p: PositionedActivity) => number,
  minBreadthToShowTitle: (p: PositionedActivity) => number
): boolean {
  return (
    rectBreadthInTimeAxis(positionedActivity) >
    minBreadthToShowTitle(positionedActivity)
  );
}

const selectDragEventOffset = createSelector(
  selectDragEvent,
  getDragEventOffset
);

function getDragEventOffset(dragEvent: TimelineDragEvent): Point {
  return dragEvent && { x: dragEvent.dx, y: dragEvent.dy };
}

const selectDragEventOffsetTime = createSelector(
  selectDragEvent,
  selectTimeOrientation,
  getDragEventOffsetTime
);

function getDragEventOffsetTime(
  dragEvent: TimelineDragEvent,
  timeOrientation: Orientation
): Point {
  return (
    dragEvent &&
    (timeOrientation === Orientation.Vertical
      ? { ...origin, y: dragEvent.dy }
      : { ...origin, x: dragEvent.dx })
  );
}

const selectRectangle = (selectOffset?: MemoizedSelector<Point>) =>
  createSelector(
    selectGetActivityTransform(selectOffset),
    selectGetRectWidth,
    selectGetRectHeight,
    selectGetActivityFontFace,
    selectGetActivityFontSize,
    selectStrokeWidth,
    selectGetActivityDisableDrag,
    selectGetShowTitle,
    selectGetActivityPadding,
    partialApply(createActivityRectangle)
  );

function createActivityRectangle(
  positionedActivity: PositionedActivity,
  transform: (p: PositionedActivity) => string,
  width: (p: PositionedActivity) => number,
  height: (p: PositionedActivity) => number,
  fontFace: (type: string) => string,
  fontSize: (type: string) => number,
  strokeWidth: number,
  disableDrag: (type: string) => boolean,
  showTitle: (p: PositionedActivity) => boolean,
  activityPadding: (type: string) => number
): ActivityRectangle {
  return {
    id: positionedActivity.id,
    title: positionedActivity.type,
    description: positionedActivity.description,
    type: positionedActivity.type,
    transform: transform(positionedActivity),
    width: width(positionedActivity),
    height: height(positionedActivity),
    fontFace: fontFace(positionedActivity.type),
    fontSize: fontSize(positionedActivity.type),
    disableDrag: disableDrag(positionedActivity.type),
    strokeWidth,
    showTitle: showTitle(positionedActivity),
    padding: activityPadding(positionedActivity.type) + strokeWidth
  };
}

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
