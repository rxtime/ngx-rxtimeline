import { createSelector } from '../store-lib/selector/create-selector';
import { selectBandScale } from '../scales/scale-selectors';
import { selectView } from '../store/state';
import { selectRectBreadthInResourceAxis } from '../activity-rectangle/selectors/activity-rectangle-size.selectors';
import {
  getResourceRectangleBreadth,
  getResourceRectangles
} from './resource-rectangle-utils';

export const selectResourceRectangleBreadth = createSelector(
  selectView,
  getResourceRectangleBreadth
);

// This could be better, tidy up as part of #373
export const selectResourceRectangles = createSelector(
  selectBandScale,
  selectView,
  selectRectBreadthInResourceAxis,
  selectResourceRectangleBreadth,
  getResourceRectangles
);
