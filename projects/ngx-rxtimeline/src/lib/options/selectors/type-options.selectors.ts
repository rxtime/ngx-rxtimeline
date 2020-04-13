import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { CompleteOptions, TypeOptions, defaultTypeOptions } from '../options';
import { partialApply } from '../../core/function-utils';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { partial } from '../../core/partial';

export const selectTypeOptions = createSelector(
  selectOptions,
  partialApply(getTypeOptions)
);

function getTypeOptions(type: string, options: CompleteOptions): TypeOptions {
  return options.type && options.type[type];
}

const selectGetTypeOption = <TOption extends keyof TypeOptions>(
  key: TOption
): MemoizedSelector<(type: string) => TypeOptions[TOption]> =>
  createSelector(selectTypeOptions, options =>
    partial(getTypeOption, options, key)
  );

function getTypeOption<TOption extends keyof TypeOptions>(
  typeOptions: (type: string) => TypeOptions,
  key: TOption,
  type: string
): TypeOptions[TOption] {
  return (
    (typeOptions(type) && typeOptions(type)[key]) || defaultTypeOptions[key]
  );
}

export const selectGetTypeLateralMargin = selectGetTypeOption('lateralMargin');
export const selectGetTypeZIndex = selectGetTypeOption('zIndex');
