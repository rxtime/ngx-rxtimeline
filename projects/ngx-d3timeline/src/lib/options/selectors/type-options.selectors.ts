import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { CompleteOptions, TypeOptions } from '../options';

export const selectTypeOptions = createSelector(selectOptions, options =>
  getTypeOptions.bind(null, options)
);

function getTypeOptions(options: CompleteOptions, type: string): TypeOptions {
  return options.type && options.type[type];
}
