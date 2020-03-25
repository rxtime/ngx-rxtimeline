import { selectView } from '../store/state';
import {
  getViewTopLeft,
  getViewClipRectangle,
  getViewClipRectangleHeight,
  getViewClipRectangleWidth
} from './view-utils';
import { createSelector } from '../store-lib/selector/create-selector';

export const selectViewTopLeft = createSelector(selectView, getViewTopLeft);

export const selectViewClipRectangleHeight = createSelector(
  selectView,
  getViewClipRectangleHeight
);

export const selectViewClipRectangleWidth = createSelector(
  selectView,
  getViewClipRectangleWidth
);

export const selectViewClipRectangle = createSelector(
  selectViewTopLeft,
  selectViewClipRectangleWidth,
  selectViewClipRectangleHeight,
  getViewClipRectangle
);
