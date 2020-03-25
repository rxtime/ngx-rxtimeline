import { createSelector } from '../store-lib/selector/create-selector';
import { selectOptions } from '../store/state';
import { flipOrientation } from '../core/orientation';
import {
  getTimeOrientation,
  getShowGridLines,
  getTypeOptions,
  getTypeActivityOptions,
  getActivityPadding,
  getTypeActivityPadding
} from './options-utils';

export const selectTimeOrientation = createSelector(
  selectOptions,
  getTimeOrientation
);
export const selectResourceOrientation = createSelector(
  selectTimeOrientation,
  flipOrientation
);

export const selectTimeAxisOptions = createSelector(
  selectOptions,
  options => options.timeAxis
);

export const selectResourceAxisOptions = createSelector(
  selectOptions,
  options => options.resourceAxis
);

export const selectActivityOptions = createSelector(
  selectOptions,
  options => options.activity
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

export const selectActivityFontFace = createSelector(
  selectActivityOptions,
  activityOptions => activityOptions.fontFace
);

export const selectActivityFontSize = createSelector(
  selectActivityOptions,
  activityOptions => activityOptions.fontSize
);

const selectActivityOptionsPadding = createSelector(
  selectActivityOptions,
  activityOptions => activityOptions.padding
);

export const selectResourcePadding = createSelector(
  selectResourceOptions,
  resourceOptions => resourceOptions.padding
);

export const selectTypeOptions = createSelector(selectOptions, options =>
  getTypeOptions.bind(null, options)
);

export const selectTypeActivityOptions = createSelector(
  selectTypeOptions,
  typeOptions => getTypeActivityOptions.bind(null, typeOptions)
);

export const selectTypeActivityPadding = createSelector(
  selectTypeActivityOptions,
  typeActivityOptions => getTypeActivityPadding.bind(null, typeActivityOptions)
);

export const selectAcivityPadding = createSelector(
  selectTypeActivityPadding,
  selectActivityOptionsPadding,
  (typeActivityPadding, activityOptionsPadding) =>
    getActivityPadding.bind(null, typeActivityPadding, activityOptionsPadding)
);
