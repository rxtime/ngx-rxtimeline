import { createSelector } from '../selector/create-selector';
import {
  selectResourceOrientation,
  selectTimeOrientation
} from '../options.selectors';
import { getAxis } from './axis-utils';
import { selectBandScale, selectTimeScale } from '../store/timeline-selectors';
import { getResourceAxisTickMarkRenderer } from './resources-axis/resource-axis-tick-mark-renderer';
import { getTimeAxisTickMarkRenderer } from './time-axis/time-axis-tick-mark-renderer';
import { selectViewTopLeft } from '../view/view.selectors';

export const selectResourceAxis = createSelector(
  selectBandScale,
  selectResourceOrientation,
  selectViewTopLeft,
  getAxis.bind(null, getResourceAxisTickMarkRenderer)
);

export const selectTimeAxis = createSelector(
  selectTimeScale,
  selectTimeOrientation,
  selectViewTopLeft,
  getAxis.bind(null, getTimeAxisTickMarkRenderer)
);
