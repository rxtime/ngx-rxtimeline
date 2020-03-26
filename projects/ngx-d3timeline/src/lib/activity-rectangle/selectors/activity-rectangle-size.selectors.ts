import { createSelector } from '../../store-lib/selector/create-selector';
import { selectTimeScale, selectBandScale } from '../../scales/scale-selectors';
import {
  selectTimeOrientation,
  selectAcivityPadding
} from '../../options/selectors/options.selectors';
import { selectResourcePadding } from '../../options/selectors/resource-options.selectors';
import {
  getRectBreadthInTimeAxis,
  getRectHeight,
  getRectWidth,
  getRectBreadthInResourceAxis
} from '../../content/content-utils';

export const selectRectBreadthInTimeAxis = createSelector(
  selectTimeScale,
  timeScale => getRectBreadthInTimeAxis.bind(null, timeScale)
);

export const selectRectBreadthInResourceAxis = createSelector(
  selectBandScale,
  selectResourcePadding,
  selectAcivityPadding,
  (bandScale, resourcePadding, activityPadding) =>
    getRectBreadthInResourceAxis.bind(
      null,
      bandScale,
      resourcePadding,
      activityPadding
    )
);

export const selectRectHeight = createSelector(
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

export const selectRectWidth = createSelector(
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
