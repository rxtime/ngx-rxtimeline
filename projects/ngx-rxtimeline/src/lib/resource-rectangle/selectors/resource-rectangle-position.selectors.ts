import { BandScale } from '../../scales/scale-types';
import {
  Point,
  translatePointInOrientation,
  translatePoint
} from '../../core/point';
import { Orientation } from '../../core/orientation';
import { createSelector } from '../../store-lib/selector/create-selector';
import { selectTimeOrientation } from '../../options/selectors/options.selectors';
import { selectViewTopLeft } from '../../view/view.selectors';
import { selectBandScale } from '../../scales/scale-selectors';
import { partialApply } from '../../core/function-utils';
import { selectResourceAxisFontSize } from '../../options/selectors/axis-options.selectors';
import { selectResourcePadding } from '../../options/selectors/resource-options.selectors';
import { sum } from '../../core/array-utils';
import { createStructuredSelector } from '../../store-lib/selector/selector-utils';

const selectTickRectOffset = createStructuredSelector<Point>({
  x: selectResourcePadding,
  y: selectResourcePadding
});

export const selectResourceRectMargin = createSelector(
  selectResourceAxisFontSize,
  selectResourcePadding,
  sum
);

const selectViewTopLeftOffset = createSelector(
  selectTimeOrientation,
  selectViewTopLeft,
  selectResourceRectMargin,
  getViewTopLeftOffset
);

// TODO: remove this function
function getViewTopLeftOffset(
  timeOrientation: Orientation,
  viewTopLeft: Point,
  resourceRectMargin: number
): Point {
  return translatePointInOrientation(
    viewTopLeft,
    -resourceRectMargin,
    timeOrientation
  );
}

export const selectResourceRectTopLeft = createSelector(
  selectTimeOrientation,
  selectViewTopLeftOffset,
  selectBandScale,
  partialApply(getResourceRectTopLeft)
);

function getResourceRectTopLeft(
  resource: string,
  timeOrientation: Orientation,
  viewTopLeftOffset: Point,
  bandScale: BandScale
): Point {
  return timeOrientation === Orientation.Vertical
    ? { ...viewTopLeftOffset, x: bandScale(resource) }
    : { ...viewTopLeftOffset, y: bandScale(resource) };
}

export const selectTickRectTopLeft = createSelector(
  selectResourceRectTopLeft,
  selectTickRectOffset,
  partialApply(getTickRectTopLeft)
);

function getTickRectTopLeft(
  resource: string,
  resourceRectTopLeft: (resource: string) => Point,
  offset: Point
) {
  return translatePoint(resourceRectTopLeft(resource), offset);
}
