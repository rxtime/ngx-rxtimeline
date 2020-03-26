import { createSelector } from '../../store-lib/selector/create-selector';
import { selectTimeScale, selectBandScale } from '../../scales/scale-selectors';
import {
  selectTimeOrientation,
  selectAcivityPadding
} from '../../options/selectors/options.selectors';
import { selectResourcePadding } from '../../options/selectors/resource-options.selectors';
import {
  getPositionInTimeAxis,
  getPositionInResourceAxis,
  getActivityX,
  getActivityY,
  getActivityTopLeft,
  getActivityTransform,
  getOffsetActivityTopLeft
} from '../../content/content-utils';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { Point } from '../../core/point';
import { partial3, partial2, partial1 } from '../../core/function-utils';

const selectPositionInTimeAxis = createSelector(
  selectTimeScale,
  partial1(getPositionInTimeAxis)
);

const selectPositionInResourceAxis = createSelector(
  selectBandScale,
  selectResourcePadding,
  selectAcivityPadding,
  partial3(getPositionInResourceAxis)
);

const selectX = createSelector(
  selectTimeOrientation,
  selectPositionInResourceAxis,
  selectPositionInTimeAxis,
  partial3(getActivityX)
);

const selectY = createSelector(
  selectTimeOrientation,
  selectPositionInResourceAxis,
  selectPositionInTimeAxis,
  partial3(getActivityY)
);

const selectTopLeft = createSelector(
  selectX,
  selectY,
  partial2(getActivityTopLeft)
);

const selectTopLeftWithOffset = (selectOffset: MemoizedSelector<Point>) =>
  createSelector(
    selectTopLeft,
    selectOffset,
    partial2(getOffsetActivityTopLeft)
  );

const createSelectTopLeft = (selectOffset?: MemoizedSelector<Point>) =>
  selectOffset ? selectTopLeftWithOffset(selectOffset) : selectTopLeft;

export const selectTransform = (selectOffset: MemoizedSelector<Point>) =>
  createSelector(
    createSelectTopLeft(selectOffset),
    partial1(getActivityTransform)
  );
