import { createSelector } from '../store-lib/selector/create-selector';
import {
  selectBandScale,
  selectBandScaleWidth
} from '../scales/scale-selectors';
import { selectView } from '../store/state';
import { getResourceRectangles } from './resource-rectangle-utils';
import { selectViewClipRectangleHeight } from '../view/view.selectors';
import { selectResourceAxisFontSize } from '../options/selectors/axis-options.selectors';

// This could be better, tidy up as part of #373
export const selectResourceRectangles = createSelector(
  selectBandScale,
  selectView,
  selectResourceAxisFontSize,
  selectBandScaleWidth,
  selectViewClipRectangleHeight,
  getResourceRectangles
);
