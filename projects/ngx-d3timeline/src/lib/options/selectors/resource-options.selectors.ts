import { selectOptions } from '../../store/state';
import { createSelector } from '../../store-lib/selector/create-selector';

export const selectResourceOptions = createSelector(
  selectOptions,
  options => options.resource
);

export const selectResourceGap = createSelector(
  selectResourceOptions,
  resourceOptions => resourceOptions.gap
);

export const selectResourcePadding = createSelector(
  selectResourceOptions,
  resourceOptions => resourceOptions.padding
);
