import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { CompleteOptions, TypeOptions } from '../options';
import { partialApply } from '../../core/function-utils';

export const selectTypeOptions = createSelector(
  selectOptions,
  partialApply(getTypeOptions)
);

function getTypeOptions(type: string, options: CompleteOptions): TypeOptions {
  return options.type && options.type[type];
}

export const selectGetTypeLateralMargin = createSelector(
  selectTypeOptions,
  partialApply(getTypeLateralMargin)
);

function getTypeLateralMargin(
  type: string,
  typeOptions: (type: string) => TypeOptions
): number {
  return (typeOptions(type) && typeOptions(type).lateralMargin) || 0;
}
