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

export const selectGetRectBreadthInTimeAxis = createSelector(
  selectTimeScale,
  partial1(getRectBreadthInTimeAxis)
);

export const selectGetRectBreadthInResourceAxis = createSelector(
  selectBandScale,
  selectResourcePadding,
  selectActivityLateralMargin,
  partial3(getRectBreadthInResourceAxis)
);

export const selectGetRectHeight = createSelector(
  selectTimeOrientation,
  selectGetRectBreadthInTimeAxis,
  selectGetRectBreadthInResourceAxis,
  partial3(getRectHeight)
);

export const selectGetRectWidth = createSelector(
  selectTimeOrientation,
  selectGetRectBreadthInTimeAxis,
  selectGetRectBreadthInResourceAxis,
  partial3(getRectWidth)
);
