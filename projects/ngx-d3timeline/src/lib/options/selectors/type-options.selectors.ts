import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { getTypeOptions, getTypeActivityOptions } from '../options-utils';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { ActivityOptions } from '../options';
import { partial1 } from '../../core/partial';

export const selectTypeOptions = createSelector(selectOptions, options =>
  getTypeOptions.bind(null, options)
);

export const selectTypeActivityOptions = createSelector(
  selectTypeOptions,
  partial1(getTypeActivityOptions)
);

export const selectGetTypeActivityOption = <T>(
  key: string
): MemoizedSelector<(type: string) => T> =>
  createSelector(
    selectTypeActivityOptions,
    options =>
      getTypeActivityOption.bind(null, options, key) as (type: string) => T
  );

function getTypeActivityOption<T>(
  typeActivityOptions: (type: string) => ActivityOptions,
  key: string,
  type: string
): T {
  return typeActivityOptions(type) && typeActivityOptions(type)[key];
}
