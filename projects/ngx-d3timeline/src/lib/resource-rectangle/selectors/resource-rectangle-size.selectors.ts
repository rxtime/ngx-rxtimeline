import { createSelector } from '../../store-lib/selector/create-selector';
import { selectBandScaleWidth } from '../../scales/scale-selectors';
import {
  selectViewClipRectangleHeight,
  selectViewClipRectangleWidth
} from '../../view/view.selectors';
import { selectTimeOrientation } from '../../options/selectors/options.selectors';
import { Orientation } from '../../core/orientation';
import { sum } from '../../core/array-utils';
import { selectTimeAxisOffset } from './resource-rectangle-position.selectors';

const selectClipRectBreadthInTimeAxis = createSelector(
  selectViewClipRectangleHeight,
  selectViewClipRectangleWidth,
  selectTimeOrientation,
  getClipRectBreadthInTimeAxis
);

function getClipRectBreadthInTimeAxis(
  clipRectangleHeight: number,
  clipRectangleWidth: number,
  timeOrientation: Orientation
) {
  return timeOrientation === Orientation.Vertical
    ? clipRectangleHeight
    : clipRectangleWidth;
}

const selectRectBreadthInTimeAxis = createSelector(
  selectTimeAxisOffset,
  selectClipRectBreadthInTimeAxis,
  sum
);

export const selectRectWidth = createSelector(
  selectTimeOrientation,
  selectRectBreadthInTimeAxis,
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
  selectRectBreadthInTimeAxis,
  selectBandScaleWidth,
  getRectHeight
);

export const selectTickRectHeight = createSelector(
  selectTimeOrientation,
  selectTimeAxisOffset,
  selectBandScaleWidth,
  getTickRectHeight
);

function getTickRectHeight(
  timeOrientation: Orientation,
  timeAxisOffset: number,
  bandScaleWidth: number
) {
  return timeOrientation === Orientation.Vertical
    ? timeAxisOffset
    : bandScaleWidth;
}

function getRectHeight(
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: number,
  bandScaleWidth: number
) {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInTimeAxis
    : bandScaleWidth;
}
