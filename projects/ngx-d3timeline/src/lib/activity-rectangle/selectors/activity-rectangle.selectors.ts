import { createSelector } from '../../store-lib/selector/create-selector';
import { selectDragEvent } from '../../store/state';
import {
  selectNonDraggedActivities,
  selectCurrentlyDraggedActivity,
  selectCurrentlyDraggedActivityWithDraggedToResource
} from '../../activity/activity.selectors';

import {
  getDragEventOffset,
  getDragEventOffsetTime
} from '../../drag/drag-utils';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { PositionedActivity } from '../../activity/positioned-activity';
import { ActivityRectangle, activityTitlePadding } from '../activity-rectangle';
import { Point } from '../../core/point';
import { selectGetActivityTransform } from './activity-rectangle-position.selectors';
import {
  selectGetRectWidth,
  selectGetRectHeight,
  selectGetRectBreadthInTimeAxis
} from './activity-rectangle-size.selectors';
import {
  selectTimeOrientation,
  selectGetActivityStrokeWidth,
  selectGetActivityDisableDrag
} from '../../options/selectors/options.selectors';
import {
  selectGetActivityFontFace,
  selectGetActivityFontSize
} from '../../options/selectors/options.selectors';
import { partial3, partial1, partial2, partial8 } from '../../core/partial';
import { Orientation } from '../../core/orientation';
import { getTextWidth } from '../../core/text-utils';

const selectGetActivityTitleBreadthInTimeAxis = createSelector(
  selectTimeOrientation,
  selectGetActivityFontFace,
  selectGetActivityFontSize,
  partial3(getActivityTitleBreadthInTimeAxis)
);

function getActivityTitleBreadthInTimeAxis(
  timeOrientation: Orientation,
  fontFace: (type: string) => string,
  fontSize: (type: string) => number,
  positionedActivity: PositionedActivity
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
  partial1(getMinBreadthToShowTitle)
);

function getMinBreadthToShowTitle(
  activityTitleBreadthInTimeAxis: (p: PositionedActivity) => number,
  positionedActivity: PositionedActivity
) {
  return (
    activityTitleBreadthInTimeAxis(positionedActivity) + activityTitlePadding
  );
}

const selectGetShowTitle = createSelector(
  selectGetRectBreadthInTimeAxis,
  selectGetMinBreadthToShowLabel,
  partial2(getShowTitle)
);

function getShowTitle(
  rectBreadthInTimeAxis: (p: PositionedActivity) => number,
  minBreadthToShowTitle: (p: PositionedActivity) => number,
  positionedActivity: PositionedActivity
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

const selectDragEventOffsetTime = createSelector(
  selectDragEvent,
  selectTimeOrientation,
  getDragEventOffsetTime
);

const selectRectangle = (selectOffset?: MemoizedSelector<Point>) =>
  createSelector(
    selectGetActivityTransform(selectOffset),
    selectGetRectWidth,
    selectGetRectHeight,
    selectGetActivityFontFace,
    selectGetActivityFontSize,
    selectGetActivityStrokeWidth,
    selectGetActivityDisableDrag,
    selectGetShowTitle,
    partial8(createActivityRectangle)
  );

function createActivityRectangle(
  transform: (p: PositionedActivity) => string,
  width: (p: PositionedActivity) => number,
  height: (p: PositionedActivity) => number,
  fontFace: (type: string) => string,
  fontSize: (type: string) => number,
  strokeWidth: (type: string) => number,
  disableDrag: (type: string) => boolean,
  showTitle: (p: PositionedActivity) => boolean,
  positionedActivity: PositionedActivity
): ActivityRectangle {
  return {
    id: positionedActivity.id,
    title: positionedActivity.type,
    type: positionedActivity.type,
    transform: transform(positionedActivity),
    width: width(positionedActivity),
    height: height(positionedActivity),
    fontFace: fontFace(positionedActivity.type),
    fontSize: fontSize(positionedActivity.type),
    disableDrag: disableDrag(positionedActivity.type),
    strokeWidth: strokeWidth(positionedActivity.type),
    showTitle: showTitle(positionedActivity)
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
