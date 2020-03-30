import { selectView } from '../store/state';
import {
  getViewTopLeft,
  getViewClipRect,
  getViewClipRectHeight,
  getViewClipRectWidth
} from './view-utils';
import { createSelector } from '../store-lib/selector/create-selector';

export const selectViewTopLeft = createSelector(selectView, getViewTopLeft);

export const selectViewClipRectHeight = createSelector(
  selectView,
  getViewClipRectHeight
);

export const selectViewClipRectWidth = createSelector(
  selectView,
  getViewClipRectWidth
);

export const selectViewClipRect = createSelector(
  selectViewTopLeft,
  selectViewClipRectWidth,
  selectViewClipRectHeight,
  getViewClipRect
);
