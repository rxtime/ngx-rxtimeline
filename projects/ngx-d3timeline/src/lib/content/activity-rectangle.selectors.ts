import { createSelector } from '../selector/create-selector';
import { selectTimeScale, selectBandScale } from '../store/timeline-selectors';
import { selectTimeOrientation } from '../store/state';
import { selectNonDraggedActivities } from './activity.selectors';
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
  getActivityRectangle
} from './content-utils';

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

const selectPositionedActivityTransform = createSelector(
  selectPositionedActivityTopLeft,
  getTopLeft => getActivityTransform.bind(null, getTopLeft)
);

const selectActivityRectangle = createSelector(
  selectPositionedActivityTransform,
  selectRectWidth,
  selectRectHeight,
  (transform, width, height) =>
    getActivityRectangle.bind(null, transform, width, height)
);

export const selectNonDraggedActivityRectangles = createSelector(
  selectNonDraggedActivities,
  selectActivityRectangle,
  (activities, positionedActivityToRectangle) =>
    activities.map(positionedActivityToRectangle)
);
