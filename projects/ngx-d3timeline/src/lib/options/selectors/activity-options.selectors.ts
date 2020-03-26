import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';

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

export const selectActivityOptionsPadding = createSelector(
  selectActivityOptions,
  activityOptions => activityOptions.padding
);
