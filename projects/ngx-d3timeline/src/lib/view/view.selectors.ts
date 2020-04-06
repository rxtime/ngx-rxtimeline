import { selectView } from '../store/state';

import { createSelector } from '../store-lib/selector/create-selector';
import { margin } from './view';
import { getPoint, Point } from '../core/point';
import { MemoizedSelector } from '../store-lib/selector/memoized-selector';
import { Rectangle } from '../core/rectangle';
import { toArray } from '../core/array-utils';
import { pipe, clampZero } from '../core/function-utils';

const selectViewWidth = createSelector(selectView, view => view && view.width);
const selectViewHeight = createSelector(
  selectView,
  view => view && view.height
);

const selectViewLeft = createSelector(selectViewWidth, minWithMargin);
const selectViewTop = createSelector(selectViewHeight, minWithMargin);
const selectViewRight = createSelector(
  selectViewWidth,
  pipe(subtractMargin, clampZero)
);
const selectViewBottom = createSelector(selectViewHeight, pipe(subtractMargin));

function minWithMargin(x: number): number {
  return Math.min(x, margin);
}

function subtractMargin(x: number) {
  return x - margin;
}

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
  pipe(subtractMarginTwice, clampZero)
);

export const selectViewClipRectWidth = createSelector(
  selectViewWidth,
  pipe(subtractMarginTwice, clampZero)
);

export function subtractMarginTwice(x: number): number {
  return x - 2 * margin;
}

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
