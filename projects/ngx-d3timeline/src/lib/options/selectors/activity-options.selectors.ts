import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';

export const selectActivityOptions = createSelector(
  selectOptions,
  options => options.activity
);

export const selectGetGlobalActivityOption = <T>(
  key: string
): MemoizedSelector<T> =>
  createSelector(selectActivityOptions, options => options[key]);
