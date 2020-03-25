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

export const selectActivityOptions = createSelector(
  selectOptions,
  options => options.activity
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
