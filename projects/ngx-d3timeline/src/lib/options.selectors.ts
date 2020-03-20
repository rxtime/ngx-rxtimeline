import { createSelector } from './selector/create-selector';
import { selectOptions } from './store/state';
import { flipOrientation } from './orientation-utils';

export const selectTimeOrientation = createSelector(
  selectOptions,
  options => options && options.orientation
);
export const selectResourceOrientation = createSelector(
  selectTimeOrientation,
  flipOrientation
);
