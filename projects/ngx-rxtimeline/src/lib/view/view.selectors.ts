import { selectView } from '../store/state';

import { createSelector } from '../store-lib/selector/create-selector';
import { Point } from '../core/point';
import { createStructuredSelector } from '../store-lib/selector/create-structured-selector';
import { Rectangle } from '../core/rectangle';
import { toArray, sum } from '../core/array-utils';
import { pipe, clampZero, subtract, double } from '../core/function-utils';
import { constSelector } from '../store-lib/selector/selector';
import { EitherOnOrientation } from '../core/orientation';
import { selectTimeOrientation } from '../options/selectors/options.selectors';

export const selectVerticalMargin = constSelector(50);
export const selectMarginRight = constSelector(50);
const selectMarginLeftWhenHorizontal = constSelector(100);
const selectMarginLeftWhenVertical = constSelector(50);
export const selectMarginLeft = createSelector(
  selectTimeOrientation,
  selectMarginLeftWhenVertical,
  selectMarginLeftWhenHorizontal,
  EitherOnOrientation
);

const selectVerticalMarginTotal = createSelector(selectVerticalMargin, double);
const selectHorizontalMarginTotal = createSelector(
  selectMarginLeft,
  selectMarginRight,
  sum
);

const selectViewWidth = createSelector(selectView, view => view && view.width);
const selectViewHeight = createSelector(
  selectView,
  view => view && view.height
);

const selectViewLeft = createSelector(
  selectViewWidth,
  selectMarginLeft,
  Math.min
);

const selectViewTop = createSelector(
  selectViewHeight,
  selectVerticalMargin,
  Math.min
);

const selectViewRight = createSelector(
  selectViewWidth,
  selectMarginRight,
  subtract
);

const selectViewBottom = createSelector(
  selectViewHeight,
  selectVerticalMargin,
  subtract
);

export const selectViewTopLeft = createStructuredSelector<Point>({
  x: selectViewLeft,
  y: selectViewTop
});

export const selectViewClipRectHeight = createSelector(
  selectViewHeight,
  selectVerticalMarginTotal,
  pipe(subtract, clampZero)
);

export const selectViewClipRectWidth = createSelector(
  selectViewWidth,
  selectHorizontalMarginTotal,
  pipe(subtract, clampZero)
);

export const selectViewClipRect = createSelector(
  selectViewTopLeft,
  selectViewClipRectWidth,
  selectViewClipRectHeight,
  getViewClipRect
);

export function getViewClipRect(
  viewTopLeft: Point,
  width: number,
  height: number
): Rectangle {
  return {
    ...viewTopLeft,
    width,
    height
  };
}

export const selectViewVerticalRange = createSelector(
  selectViewTop,
  selectViewBottom,
  toArray
);

export const selectViewHorizontalRange = createSelector(
  selectViewLeft,
  selectViewRight,
  toArray
);
