import { createSelector } from '../store-lib/selector/create-selector';
import { selectBandScale } from '../scales/scale-selectors';
import { selectView } from '../store/state';
import { selectRectBreadthInResourceAxis } from '../activity-rectangle/selectors/activity-rectangle-size.selectors';
import { getResourceRectangles } from './resource-rectangle-utils';
import { selectViewClipRectangleHeight } from '../view/view.selectors';

// This could be better, tidy up as part of #373
export const selectResourceRectangles = createSelector(
  selectBandScale,
  selectView,
  selectRectBreadthInResourceAxis,
  selectViewClipRectangleHeight,
  getResourceRectangles
);
