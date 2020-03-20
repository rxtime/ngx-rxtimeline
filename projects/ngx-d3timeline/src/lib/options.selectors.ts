import { createSelector } from './selector/create-selector';
import { selectOptions } from './store/state';
import { flipOrientation, getTimeOrientation } from './orientation-utils';

export const selectTimeOrientation = createSelector(
  selectOptions,
  getTimeOrientation
);
export const selectResourceOrientation = createSelector(
  selectTimeOrientation,
  flipOrientation
);

export const selectActivityFontSize = createSelector(
  selectOptions,
  options => options && options.activityFontSize
);
