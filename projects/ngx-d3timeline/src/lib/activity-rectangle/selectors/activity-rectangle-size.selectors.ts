import { createSelector } from '../../store-lib/selector/create-selector';
import { selectTimeScale, selectBandScale } from '../../scales/scale-selectors';
import {
  selectTimeOrientation,
  selectStrokeWidth
} from '../../options/selectors/options.selectors';
import { selectGetActivityLateralMargin } from '../../options/selectors/activity-options.selectors';
import { selectResourcePadding } from '../../options/selectors/resource-options.selectors';

import { partial1, partial3, partial4 } from '../../core/partial';
import { TimeScale, BandScale } from '../../scales/scale-types';
import { PositionedActivity } from '../../activity/positioned-activity';
import { Orientation } from '../../core/orientation';

export const selectGetRectBreadthInTimeAxis = createSelector(
  selectTimeScale,
  partial1(getRectBreadthInTimeAxis)
);

function getRectBreadthInTimeAxis(
  timeScale: TimeScale,
  positionedActivity: PositionedActivity
): number {
  return (
    timeScale(positionedActivity.finish) - timeScale(positionedActivity.start)
  );
}

const selectGetRectBreadthInResourceAxis = createSelector(
  selectBandScale,
  selectResourcePadding,
  selectGetActivityLateralMargin,
  selectStrokeWidth,
  partial4(getRectBreadthInResourceAxis)
);

function getRectBreadthInResourceAxis(
  bandScale: BandScale,
  resourcePadding: number,
  activityLateralMargin: (type: string) => number,
  strokeWidth: number,
  positionedActivity: PositionedActivity
) {
  return (
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
  partial3(getRectHeight)
);

function getRectHeight(
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: (p: PositionedActivity) => number,
  rectBreadthInResourceAxis: (p: PositionedActivity) => number,
  positionedActivity: PositionedActivity
): number {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInTimeAxis(positionedActivity)
    : rectBreadthInResourceAxis(positionedActivity);
}

export const selectGetRectWidth = createSelector(
  selectTimeOrientation,
  selectGetRectBreadthInTimeAxis,
  selectGetRectBreadthInResourceAxis,
  partial3(getRectWidth)
);

function getRectWidth(
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: (p: PositionedActivity) => number,
  rectBreadthInResourceAxis: (p: PositionedActivity) => number,
  positionedActivity: PositionedActivity
) {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInResourceAxis(positionedActivity)
    : rectBreadthInTimeAxis(positionedActivity);
}
