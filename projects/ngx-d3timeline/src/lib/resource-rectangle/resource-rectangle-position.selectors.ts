import { BandScale } from '../scales/scale-types';
import { Point, translatePointInOrientation } from '../core/point';
import { Orientation } from '../core/orientation';
import { createSelector } from '../store-lib/selector/create-selector';
import { selectTimeOrientation } from '../options/selectors/options.selectors';
import { selectViewTopLeft } from '../view/view.selectors';
import { selectBandScale } from '../scales/scale-selectors';
import { partialApply } from '../core/function-utils';
import { selectResourceAxisFontSize } from '../options/selectors/axis-options.selectors';

export const selectTimeAxisOffset = createSelector(
  selectTimeOrientation,
  selectResourceAxisFontSize,
  getTimeAxisOffset
);

function getTimeAxisOffset(
  timeOrientation: Orientation,
  resourceAxisFontSize: number
) {
  return timeOrientation === Orientation.Vertical ? resourceAxisFontSize : 0;
}

const selectViewTopLeftOffset = createSelector(
  selectTimeOrientation,
  selectViewTopLeft,
  selectTimeAxisOffset,
  getViewTopLeftOffset
);

function getViewTopLeftOffset(
  timeOrientation: Orientation,
  viewTopLeft: Point,
  timeAxisOffset: number
): Point {
  return translatePointInOrientation(
    viewTopLeft,
    -timeAxisOffset,
    timeOrientation
  );
}

export const selectResourceRectangleTopLeft = createSelector(
  selectTimeOrientation,
  selectViewTopLeftOffset,
  selectBandScale,
  partialApply(getResourceRectangleTopLeft)
);

function getResourceRectangleTopLeft(
  resource: string,
  timeOrientation: Orientation,
  viewTopLeft: Point,
  bandScale: BandScale
): Point {
  return timeOrientation === Orientation.Vertical
    ? { ...viewTopLeft, x: bandScale(resource) }
    : { ...viewTopLeft, y: bandScale(resource) };
}
