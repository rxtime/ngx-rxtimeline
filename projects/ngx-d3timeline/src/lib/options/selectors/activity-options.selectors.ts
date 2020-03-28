import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { selectTypeOptions } from './type-options.selectors';
import { partial1, partial2 } from '../../core/partial';
import { ActivityOptions, TypeOptions } from '../options';

const selectActivityOptions = createSelector(
  selectOptions,
  options => options.activity
);

const selectTypeActivityOptions = createSelector(
  selectTypeOptions,
  partial1(getTypeActivityOptions)
);

function getTypeActivityOptions(
  typeOptions: (type: string) => TypeOptions,
  type: string
): ActivityOptions {
  return typeOptions(type) && typeOptions(type).activity;
}

const selectGetTypeActivityOption = <T>(
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

const selectGetGlobalActivityOption = <T>(key: string): MemoizedSelector<T> =>
  createSelector(selectActivityOptions, options => options[key]);

const selectGetActivityOption = <T>(
  key: string
): MemoizedSelector<(type: string) => T> =>
  createSelector(
    selectGetTypeActivityOption<T>(key),
    selectGetGlobalActivityOption<T>(key),
    partial2(getActivityOption)
  );

function getActivityOption<T>(
  typeActivityOption: (type: string) => T,
  globalActivityOption: T,
  type: string
): T {
  return typeActivityOption(type) || globalActivityOption;
}

export const selectGetActivityLateralMargin = selectGetActivityOption<number>(
  'lateralMargin'
);
export const selectGetActivityDisableDrag = selectGetActivityOption<boolean>(
  'disableDrag'
);
export const selectGetActivityFontFace = selectGetActivityOption<string>(
  'fontFace'
);
export const selectGetActivityFontSize = selectGetActivityOption<number>(
  'fontSize'
);
export const selectGetActivityPadding = selectGetActivityOption<number>(
  'padding'
);
