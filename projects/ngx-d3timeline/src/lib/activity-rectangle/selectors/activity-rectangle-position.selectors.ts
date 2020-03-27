import { createSelector } from '../../store-lib/selector/create-selector';
import { selectTimeScale, selectBandScale } from '../../scales/scale-selectors';
import {
  selectTimeOrientation,
  selectActivityLateralMargin
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
import { partial3, partial2, partial1 } from '../../core/partial';

const selectGetPositionInTimeAxis = createSelector(
  selectTimeScale,
  partial1(getPositionInTimeAxis)
);

const selectGetPositionInResourceAxis = createSelector(
  selectBandScale,
  selectResourcePadding,
  selectActivityLateralMargin,
  partial3(getPositionInResourceAxis)
);

const selectGetActivityX = createSelector(
  selectTimeOrientation,
  selectGetPositionInResourceAxis,
  selectGetPositionInTimeAxis,
  partial3(getActivityX)
);

const selectGetActivityY = createSelector(
  selectTimeOrientation,
  selectGetPositionInResourceAxis,
  selectGetPositionInTimeAxis,
  partial3(getActivityY)
);

const selectGetActivityTopLeft = createSelector(
  selectGetActivityX,
  selectGetActivityY,
  partial2(getActivityTopLeft)
);

const selectGetOffsetActivityTopLeft = (
  selectOffset: MemoizedSelector<Point>
) =>
  createSelector(
    selectGetActivityTopLeft,
    selectOffset,
    partial2(getOffsetActivityTopLeft)
  );

const createSelectTopLeft = (selectOffset?: MemoizedSelector<Point>) =>
  selectOffset
    ? selectGetOffsetActivityTopLeft(selectOffset)
    : selectGetActivityTopLeft;

export const selectGetActivityTransform = (
  selectOffset: MemoizedSelector<Point>
) =>
  createSelector(
    createSelectTopLeft(selectOffset),
    partial1(getActivityTransform)
  );
