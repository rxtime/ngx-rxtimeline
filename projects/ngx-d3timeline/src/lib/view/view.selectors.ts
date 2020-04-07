import { selectView } from '../store/state';

import { createSelector } from '../store-lib/selector/create-selector';
import { getPoint, Point } from '../core/point';
import { MemoizedSelector } from '../store-lib/selector/memoized-selector';
import { Rectangle } from '../core/rectangle';
import { toArray } from '../core/array-utils';
import { pipe, clampZero, subtract, double } from '../core/function-utils';
import { constSelector } from '../store-lib/selector/selector';

export const selectMargin = constSelector(50);
const selectDoubleMargin = createSelector(selectMargin, double);

const selectViewWidth = createSelector(selectView, view => view && view.width);
const selectViewHeight = createSelector(
  selectView,
  view => view && view.height
);

const selectViewLeft = createSelector(selectViewWidth, selectMargin, Math.min);
const selectViewTop = createSelector(selectViewHeight, selectMargin, Math.min);
const selectViewRight = createSelector(selectViewWidth, selectMargin, subtract);
const selectViewBottom = createSelector(
  selectViewHeight,
  selectMargin,
  subtract
);

const createSelectViewPoint = (
  selectX: MemoizedSelector<number>,
  selectY: MemoizedSelector<number>
) => createSelector(selectX, selectY, getPoint);

export const selectViewTopLeft = createSelectViewPoint(
  selectViewLeft,
  selectViewTop
);

export const selectViewClipRectHeight = createSelector(
  selectViewHeight,
  selectDoubleMargin,
  pipe(subtract, clampZero)
);

export const selectViewClipRectWidth = createSelector(
  selectViewWidth,
  selectDoubleMargin,
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
