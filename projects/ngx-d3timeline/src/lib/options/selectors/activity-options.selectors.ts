import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';

export const selectActivityOptions = createSelector(
  selectOptions,
  options => options.activity
);

export const selectActivityFontFace = createSelector(
  selectActivityOptions,
  options => options.fontFace
);

export const selectActivityFontSize = createSelector(
  selectActivityOptions,
  options => options.fontSize
);

export const selectActivityOptionsPadding = createSelector(
  selectActivityOptions,
  options => options.padding
);

export const selectActivityOptionsStrokeWidth = createSelector(
  selectActivityOptions,
  options => options.strokeWidth
);
