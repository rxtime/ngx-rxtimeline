import { createSelector } from '../../store-lib/selector/create-selector';
import { selectTimeScale, selectBandScale } from '../../scales/scale-selectors';
import {
  selectTimeOrientation,
  selectActivityLateralMargin
} from '../../options/selectors/options.selectors';
import { selectResourcePadding } from '../../options/selectors/resource-options.selectors';
import {
  getRectBreadthInTimeAxis,
  getRectHeight,
  getRectWidth,
  getRectBreadthInResourceAxis
} from '../../content/content-utils';
import { partial1, partial3 } from '../../core/partial';

export const selectRectBreadthInTimeAxis = createSelector(
  selectTimeScale,
  partial1(getRectBreadthInTimeAxis)
);

export const selectRectBreadthInResourceAxis = createSelector(
  selectBandScale,
  selectResourcePadding,
  selectActivityLateralMargin,
  partial3(getRectBreadthInResourceAxis)
);

export const selectRectHeight = createSelector(
  selectTimeOrientation,
  selectRectBreadthInTimeAxis,
  selectRectBreadthInResourceAxis,
  partial3(getRectHeight)
);

export const selectRectWidth = createSelector(
  selectTimeOrientation,
  selectRectBreadthInTimeAxis,
  selectRectBreadthInResourceAxis,
  partial3(getRectWidth)
);
