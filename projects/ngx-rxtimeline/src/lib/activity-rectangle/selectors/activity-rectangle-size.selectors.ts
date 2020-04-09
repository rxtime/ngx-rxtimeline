import { createSelector } from '../../store-lib/selector/create-selector';
import { selectTimeScale, selectBandScale } from '../../scales/scale-selectors';
import {
  selectTimeOrientation,
  selectStrokeWidth
} from '../../options/selectors/options.selectors';
import { selectGetTypeLateralMargin } from '../../options/selectors/type-options.selectors';
import { selectResourcePadding } from '../../options/selectors/resource-options.selectors';
import { partialApply, clampZero } from '../../core/function-utils';
import { TimeScale, BandScale } from '../../scales/scale-types';
import { PositionedActivity } from '../../activity/positioned-activity';
import { Orientation } from '../../core/orientation';

export const selectGetRectBreadthInTimeAxis = createSelector(
  selectTimeScale,
  partialApply(getRectBreadthInTimeAxis)
);

function getRectBreadthInTimeAxis(
  positionedActivity: PositionedActivity,
  timeScale: TimeScale
): number {
  return clampZero(
    timeScale(positionedActivity.finish) - timeScale(positionedActivity.start)
  );
}

const selectGetRectBreadthInResourceAxis = createSelector(
  selectBandScale,
  selectResourcePadding,
  selectGetTypeLateralMargin,
  selectStrokeWidth,
  partialApply(getRectBreadthInResourceAxis)
);

function getRectBreadthInResourceAxis(
  positionedActivity: PositionedActivity,
  bandScale: BandScale,
  resourcePadding: number,
  activityLateralMargin: (type: string) => number,
  strokeWidth: number
) {
  return clampZero(
    bandScale.bandwidth() -
      2 * resourcePadding -
      2 * activityLateralMargin(positionedActivity.type) -
      strokeWidth
  );
}

export const selectGetRectHeight = createSelector(
  selectTimeOrientation,
  selectGetRectBreadthInTimeAxis,
  selectGetRectBreadthInResourceAxis,
  partialApply(getRectHeight)
);

function getRectHeight(
  positionedActivity: PositionedActivity,
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: (p: PositionedActivity) => number,
  rectBreadthInResourceAxis: (p: PositionedActivity) => number
): number {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInTimeAxis(positionedActivity)
    : rectBreadthInResourceAxis(positionedActivity);
}

export const selectGetRectWidth = createSelector(
  selectTimeOrientation,
  selectGetRectBreadthInTimeAxis,
  selectGetRectBreadthInResourceAxis,
  partialApply(getRectWidth)
);

function getRectWidth(
  positionedActivity: PositionedActivity,
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: (p: PositionedActivity) => number,
  rectBreadthInResourceAxis: (p: PositionedActivity) => number
) {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInResourceAxis(positionedActivity)
    : rectBreadthInTimeAxis(positionedActivity);
}
