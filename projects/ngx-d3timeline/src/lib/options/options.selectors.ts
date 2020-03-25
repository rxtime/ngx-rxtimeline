import { createSelector } from '../store-lib/selector/create-selector';
import { selectOptions } from '../store/state';
import { flipOrientation } from '../core/orientation';
import { getTimeOrientation, getShowGridLines } from './options-utils';

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

export const selectTimeAxisOptions = createSelector(
  selectOptions,
  options => options.timeAxis
);

export const selectResourceAxisOptions = createSelector(
  selectOptions,
  options => options.resourceAxis
);

export const selectResourceOptions = createSelector(
  selectOptions,
  options => options.resource
);

export const selectResourceAxisShowGridLines = createSelector(
  selectResourceAxisOptions,
  getShowGridLines
);

export const selectTimeAxisShowGridLines = createSelector(
  selectTimeAxisOptions,
  getShowGridLines
);

export const selectResourceGap = createSelector(
  selectResourceOptions,
  resourceOptions => resourceOptions.gap
);

export const selectResourcePadding = createSelector(
  selectResourceOptions,
  resourceOptions => resourceOptions.padding
);
