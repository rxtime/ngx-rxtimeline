import { createSelector } from '../selector/create-selector';
import { selectTimeScale, selectBandScale } from '../store/timeline-selectors';
import { selectTimeOrientation, selectDragEvent } from '../store/state';
import {
  selectNonDraggedActivities,
  selectCurrentlyDraggedActivity,
  selectCurrentlyDraggedActivityWithDraggedToSeries
} from './activity.selectors';
import {
  getPositionInTimeAxis,
  getPositionInResourceAxis,
  getActivityX,
  getActivityY,
  getActivityTopLeft,
  getRectBreadthInTimeAxis,
  getRectHeight,
  getRectWidth,
  getActivityTransform,
  createActivityRectangle,
  getOffsetActivityTopLeft
} from './content-utils';
import { getDragEventOffset, getDragEventOffsetTime } from '../drag-utils';
import { MemoizedSelector } from '../selector/memoized-selector';
import { PositionedActivity } from '../positioned-activity';
import { ActivityRectangle } from './activity-rectangle';
import { Point } from '../point';

const selectPositionInTimeAxis = createSelector(selectTimeScale, timeScale =>
  getPositionInTimeAxis.bind(null, timeScale)
);

const selectPositionInResourceAxis = createSelector(
  selectBandScale,
  bandScale => getPositionInResourceAxis.bind(null, bandScale)
);

const selectPositionedActivityY = createSelector(
  selectTimeOrientation,
  selectPositionInResourceAxis,
  selectPositionInTimeAxis,
  (timeOrientation, positionInResourceAxis, positionInTimeAxis) =>
    getActivityY.bind(
      null,
      timeOrientation,
      positionInResourceAxis,
      positionInTimeAxis
    )
);

const selectPositionedActivityX = createSelector(
  selectTimeOrientation,
  selectPositionInResourceAxis,
  selectPositionInTimeAxis,
  (timeOrientation, positionInResourceAxis, positionInTimeAxis) =>
    getActivityX.bind(
      null,
      timeOrientation,
      positionInResourceAxis,
      positionInTimeAxis
    )
);

const selectPositionedActivityTopLeft = createSelector(
  selectPositionedActivityX,
  selectPositionedActivityY,
  (x, y) => getActivityTopLeft.bind(null, x, y)
);

const selectRectBreadthInTimeAxis = createSelector(selectTimeScale, timeScale =>
  getRectBreadthInTimeAxis.bind(null, timeScale)
);

const selectRectBreadthInResourceAxis = createSelector(
  selectBandScale,
  bandScale => bandScale.bandwidth()
);

const selectRectHeight = createSelector(
  selectTimeOrientation,
  selectRectBreadthInTimeAxis,
  selectRectBreadthInResourceAxis,
  (timeOrientation, rectBreadthInTimeAxis, rectBreadthInResourceAxis) =>
    getRectHeight.bind(
      null,
      timeOrientation,
      rectBreadthInTimeAxis,
      rectBreadthInResourceAxis
    )
);

const selectRectWidth = createSelector(
  selectTimeOrientation,
  selectRectBreadthInTimeAxis,
  selectRectBreadthInResourceAxis,
  (timeOrientation, rectBreadthInTimeAxis, rectBreadthInResourceAxis) =>
    getRectWidth.bind(
      null,
      timeOrientation,
      rectBreadthInTimeAxis,
      rectBreadthInResourceAxis
    )
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

const selectTopLeftWithOffset = (selectOffset: MemoizedSelector<Point>) =>
  createSelector(
    selectPositionedActivityTopLeft,
    selectOffset,
    (topLeft, offset) => getOffsetActivityTopLeft.bind(null, topLeft, offset)
  );

const selectTransform = (selectTopLeft: MemoizedSelector<Point>) =>
  createSelector(selectTopLeft, topLeft =>
    getActivityTransform.bind(null, topLeft)
  );

const createSelectTransform = (selectOffset?: MemoizedSelector<Point>) =>
  selectOffset
    ? selectTransform(selectTopLeftWithOffset(selectOffset))
    : selectTransform(selectPositionedActivityTopLeft);

const selectRectangle = (selectOffset?: MemoizedSelector<Point>) =>
  createSelector(
    createSelectTransform(selectOffset),
    selectRectWidth,
    selectRectHeight,
    (transform, width, height) =>
      createActivityRectangle.bind(null, transform, width, height)
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
  selectCurrentlyDraggedActivityWithDraggedToSeries,
  selectRectangle(selectDragEventOffsetTime),
  activityToRectangle
);

function activityToRectangle(
  activity: PositionedActivity,
  getActivityRectangle: (a: PositionedActivity) => ActivityRectangle
) {
  return activity && getActivityRectangle(activity);
}
