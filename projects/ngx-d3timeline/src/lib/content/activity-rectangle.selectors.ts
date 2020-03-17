import { createSelector } from '../selector/create-selector';
import { selectTimeScale, selectBandScale } from '../store/timeline-selectors';
import { selectTimeOrientation, selectDragEvent } from '../store/state';
import {
  selectNonDraggedActivities,
  selectCurrentlyDraggedActivity
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
  getActivityRectangle,
  getOffsetActivityTopLeft,
  PointInAxis,
  ActivityTransform
} from './content-utils';
import { getDragEventOffset } from '../drag-utils';
import { MemoizedSelector } from '../selector/memoized-selector';
import { Activity } from '../activity';
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

const selectOffsetActivityTopLeft = createSelector(
  selectPositionedActivityTopLeft,
  selectDragEventOffset,
  (topLeft, offset) => getOffsetActivityTopLeft.bind(null, topLeft, offset)
);

const createSelectTransform = (selectTopLeft: MemoizedSelector<PointInAxis>) =>
  createSelector(selectTopLeft, topLeft =>
    getActivityTransform.bind(null, topLeft)
  );

const selectPositionedActivityTransform = createSelectTransform(
  selectPositionedActivityTopLeft
);
const selectOffsetActivityTransform = createSelectTransform(
  selectOffsetActivityTopLeft
);

const createSelectRectangle = (
  selectTransform: MemoizedSelector<ActivityTransform>
) =>
  createSelector(
    selectTransform,
    selectRectWidth,
    selectRectHeight,
    (transform, width, height) =>
      getActivityRectangle.bind(null, transform, width, height)
  );

const selectActivityRectangle = createSelectRectangle(
  selectPositionedActivityTransform
);

const selectOffsetAcivityRectangle = createSelectRectangle(
  selectOffsetActivityTransform
);

export const selectNonDraggedActivityRectangles = createSelector(
  selectNonDraggedActivities,
  selectActivityRectangle,
  (activities, positionedActivityToRectangle) =>
    activities.map(positionedActivityToRectangle)
);

export const selectDraggingActivityRectangle = createSelector(
  selectCurrentlyDraggedActivity,
  selectOffsetAcivityRectangle,
  (draggedActivity, activityToRectangle) =>
    draggedActivity && activityToRectangle(draggedActivity)
);

export const selectDraggedFromRectangle = createSelector(
  selectCurrentlyDraggedActivity,
  selectActivityRectangle,
  (draggedActivity, activityToRectangle) =>
    draggedActivity && activityToRectangle(draggedActivity)
);
