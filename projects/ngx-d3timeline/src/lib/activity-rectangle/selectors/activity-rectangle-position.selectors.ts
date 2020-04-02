import { createSelector } from '../../store-lib/selector/create-selector';
import { selectTimeScale, selectBandScale } from '../../scales/scale-selectors';
import {
  selectTimeOrientation,
  selectStrokeWidth
} from '../../options/selectors/options.selectors';
import { selectGetTypeLateralMargin } from '../../options/selectors/type-options.selectors';
import { selectResourcePadding } from '../../options/selectors/resource-options.selectors';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { Point, translatePoint, pointToTransform } from '../../core/point';
import { partialApply } from '../../core/function-utils';
import { BandScale, TimeScale } from '../../scales/scale-types';
import { PositionedActivity } from '../../activity/positioned-activity';
import { Orientation } from '../../core/orientation';

const selectGetPositionInTimeAxis = createSelector(
  selectTimeScale,
  partialApply(getPositionInTimeAxis)
);

function getPositionInTimeAxis(
  positionedActivity: PositionedActivity,
  timeScale: TimeScale
): number {
  return timeScale(positionedActivity.updatedStart);
}

const selectGetPositionInResourceAxis = createSelector(
  selectBandScale,
  selectResourcePadding,
  selectGetTypeLateralMargin,
  selectStrokeWidth,
  partialApply(getPositionInResourceAxis)
);

function getPositionInResourceAxis(
  positionedActivity: PositionedActivity,
  bandScale: BandScale,
  resourcePadding: number,
  getActivityLateralMargin: (type: string) => number,
  strokeWidth: number
): number {
  return (
    bandScale(positionedActivity.updatedResource) +
    resourcePadding +
    getActivityLateralMargin(positionedActivity.type) +
    0.5 * strokeWidth
  );
}

const selectGetActivityX = createSelector(
  selectTimeOrientation,
  selectGetPositionInResourceAxis,
  selectGetPositionInTimeAxis,
  partialApply(getActivityX)
);

function getActivityX(
  positionedActivity: PositionedActivity,
  timeOrientation: Orientation,
  positionInResourceAxis: (p: PositionedActivity) => number,
  positionInTimeAxis: (p: PositionedActivity) => number
): number {
  return timeOrientation === Orientation.Vertical
    ? positionInResourceAxis(positionedActivity)
    : positionInTimeAxis(positionedActivity);
}

const selectGetActivityY = createSelector(
  selectTimeOrientation,
  selectGetPositionInResourceAxis,
  selectGetPositionInTimeAxis,
  partialApply(getActivityY)
);

function getActivityY(
  positionedActivity: PositionedActivity,
  timeOrientation: Orientation,
  positionInResourceAxis: (p: PositionedActivity) => number,
  positionInTimeAxis: (p: PositionedActivity) => number
): number {
  return timeOrientation === Orientation.Vertical
    ? positionInTimeAxis(positionedActivity)
    : positionInResourceAxis(positionedActivity);
}

const selectGetActivityTopLeft = createSelector(
  selectGetActivityX,
  selectGetActivityY,
  partialApply(getActivityTopLeft)
);

function getActivityTopLeft(
  positionedActivity: PositionedActivity,
  x: (p: PositionedActivity) => number,
  y: (p: PositionedActivity) => number
): Point {
  return { x: x(positionedActivity), y: y(positionedActivity) };
}

const selectGetOffsetActivityTopLeft = (
  selectOffset: MemoizedSelector<Point>
) =>
  createSelector(
    selectGetActivityTopLeft,
    selectOffset,
    partialApply(getOffsetActivityTopLeft)
  );

function getOffsetActivityTopLeft(
  positionedActivity: PositionedActivity,
  activityTopLeft: (p: PositionedActivity) => Point,
  offset: Point
): Point {
  return translatePoint(activityTopLeft(positionedActivity), offset);
}

const createSelectTopLeft = (selectOffset?: MemoizedSelector<Point>) =>
  selectOffset
    ? selectGetOffsetActivityTopLeft(selectOffset)
    : selectGetActivityTopLeft;

export const selectGetActivityTransform = (
  selectOffset: MemoizedSelector<Point>
) =>
  createSelector(
    createSelectTopLeft(selectOffset),
    partialApply(getActivityTransform)
  );

function getActivityTransform(
  positionedActivity: PositionedActivity,
  activityTopLeft: (p: PositionedActivity) => Point
): string {
  return pointToTransform(activityTopLeft(positionedActivity));
}
