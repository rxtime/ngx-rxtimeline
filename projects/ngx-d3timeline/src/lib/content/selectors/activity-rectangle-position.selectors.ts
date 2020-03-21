import { createSelector } from '../../store-lib/selector/create-selector';
import {
  selectTimeScale,
  selectBandScale
} from '../../store/timeline-selectors';
import { selectTimeOrientation } from '../../options.selectors';
import {
  getPositionInTimeAxis,
  getPositionInResourceAxis,
  getActivityX,
  getActivityY,
  getActivityTopLeft,
  getActivityTransform,
  getOffsetActivityTopLeft
} from '../content-utils';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { Point } from '../../point';

const selectPositionInTimeAxis = createSelector(selectTimeScale, timeScale =>
  getPositionInTimeAxis.bind(null, timeScale)
);

const selectPositionInResourceAxis = createSelector(
  selectBandScale,
  bandScale => getPositionInResourceAxis.bind(null, bandScale)
);

const selectX = createSelector(
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

const selectY = createSelector(
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

const selectTopLeft = createSelector(selectX, selectY, (x, y) =>
  getActivityTopLeft.bind(null, x, y)
);

const selectTopLeftWithOffset = (selectOffset: MemoizedSelector<Point>) =>
  createSelector(selectTopLeft, selectOffset, (topLeft, offset) =>
    getOffsetActivityTopLeft.bind(null, topLeft, offset)
  );

const createSelectTopLeft = (selectOffset?: MemoizedSelector<Point>) =>
  selectOffset ? selectTopLeftWithOffset(selectOffset) : selectTopLeft;

export const selectTransform = (selectOffset: MemoizedSelector<Point>) =>
  createSelector(createSelectTopLeft(selectOffset), topLeft =>
    getActivityTransform.bind(null, topLeft)
  );
