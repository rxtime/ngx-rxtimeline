import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { selectTypeOptions } from './type-options.selectors';
import { partialApply } from '../../core/function-utils';
import { ActivityOptions, TypeOptions } from '../options';

const selectActivityOptions = createSelector(
  selectOptions,
  options => options.activity
);

const selectTypeActivityOptions = createSelector(
  selectTypeOptions,
  partialApply(getTypeActivityOptions)
);

function getTypeActivityOptions(
  type: string,
  typeOptions: (type: string) => TypeOptions
): ActivityOptions {
  return typeOptions(type) && typeOptions(type).activity;
}

const selectGetTypeActivityOption = <TKey extends keyof ActivityOptions>(
  key: TKey
): MemoizedSelector<(type: string) => ActivityOptions[TKey]> =>
  createSelector(selectTypeActivityOptions, options =>
    getTypeActivityOption.bind(null, options, key)
  );

function getTypeActivityOption<TKey extends keyof ActivityOptions>(
  typeActivityOptions: (type: string) => ActivityOptions,
  key: TKey,
  type: string
): ActivityOptions[TKey] {
  return typeActivityOptions(type) && typeActivityOptions(type)[key];
}

const selectGetGlobalActivityOption = <TKey extends keyof ActivityOptions>(
  key: TKey
): MemoizedSelector<ActivityOptions[TKey]> =>
  createSelector(selectActivityOptions, options => options[key]);

const selectGetActivityOption = <TKey extends keyof ActivityOptions>(
  key: TKey
): MemoizedSelector<(type: string) => ActivityOptions[TKey]> =>
  createSelector(
    selectGetTypeActivityOption(key),
    selectGetGlobalActivityOption(key),
    partialApply(getActivityOption)
  );

function getActivityOption<T>(
  type: string,
  typeActivityOption: (type: string) => T,
  globalActivityOption: T
): T {
  return typeActivityOption(type) || globalActivityOption;
}

export const selectGetActivityLateralMargin = selectGetActivityOption(
  'lateralMargin'
);
export const selectGetActivityDisableDrag = selectGetActivityOption(
  'disableDrag'
);
export const selectGetActivityFontFace = selectGetActivityOption('fontFace');
export const selectGetActivityFontSize = selectGetActivityOption('fontSize');
export const selectGetActivityPadding = selectGetActivityOption('padding');
