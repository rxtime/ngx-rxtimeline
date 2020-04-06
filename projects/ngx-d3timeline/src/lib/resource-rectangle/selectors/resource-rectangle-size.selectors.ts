import { createSelector } from '../../store-lib/selector/create-selector';
import { selectBandScaleWidth } from '../../scales/scale-selectors';
import {
  selectViewClipRectHeight,
  selectViewClipRectWidth
} from '../../view/view.selectors';
import { selectTimeOrientation } from '../../options/selectors/options.selectors';
import { Orientation } from '../../core/orientation';
import { sum } from '../../core/array-utils';
import { selectResourceRectMargin } from './resource-rectangle-position.selectors';
import { selectResourcePadding } from '../../options/selectors/resource-options.selectors';
import { selectResourceAxisFontSize } from '../../options/selectors/axis-options.selectors';
import { clampZero } from '../../core/function-utils';

const selectClipRectBreadthInTimeAxis = createSelector(
  selectViewClipRectHeight,
  selectViewClipRectWidth,
  selectTimeOrientation,
  getClipRectBreadthInTimeAxis
);

function getClipRectBreadthInTimeAxis(
  clipRectHeight: number,
  clipRectWidth: number,
  timeOrientation: Orientation
) {
  return timeOrientation === Orientation.Vertical
    ? clipRectHeight
    : clipRectWidth;
}

const selectResourceRectBreadthInTimeAxis = createSelector(
  selectResourceRectMargin,
  selectClipRectBreadthInTimeAxis,
  sum
);

export const selectTickRectWidth = createSelector(
  selectBandScaleWidth,
  selectResourcePadding,
  getTickRectWidth
);

function getTickRectWidth(bandScaleWidth: number, resourcePadding: number) {
  return clampZero(bandScaleWidth - 2 * resourcePadding);
}

export const selectResourceRectWidth = createSelector(
  selectTimeOrientation,
  selectResourceRectBreadthInTimeAxis,
  selectBandScaleWidth,
  getRectWidth
);

function getRectWidth(
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: number,
  bandScaleWidth: number
) {
  return timeOrientation === Orientation.Vertical
    ? bandScaleWidth
    : rectBreadthInTimeAxis;
}

export const selectResourceRectHeight = createSelector(
  selectTimeOrientation,
  selectResourceRectBreadthInTimeAxis,
  selectBandScaleWidth,
  getResourceRectHeight
);

function getResourceRectHeight(
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: number,
  bandScaleWidth: number
) {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInTimeAxis
    : bandScaleWidth;
}

export const selectTickRectHeight = createSelector(
  selectTimeOrientation,
  selectResourceAxisFontSize,
  getTickRectHeight
);

function getTickRectHeight(
  timeOrientation: Orientation,
  resourceAxisFontSize: number
) {
  return timeOrientation === Orientation.Vertical ? resourceAxisFontSize : 0;
}
