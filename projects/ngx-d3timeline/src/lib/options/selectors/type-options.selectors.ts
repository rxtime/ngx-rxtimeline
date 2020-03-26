import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import {
  getTypeOptions,
  getTypeActivityOptions,
  getTypeActivityPadding
} from '../options-utils';

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
