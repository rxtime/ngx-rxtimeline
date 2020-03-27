import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { flipOrientation } from '../../core/orientation';
import { getTimeOrientation } from '../options-utils';
import { selectGetTypeActivityOption } from './type-options.selectors';
import { selectGetGlobalActivityOption } from './activity-options.selectors';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { partial2 } from '../../core/partial';

export const selectTimeOrientation = createSelector(
  selectOptions,
  getTimeOrientation
);
export const selectResourceOrientation = createSelector(
  selectTimeOrientation,
  flipOrientation
);

const selectGetActivityOption = <T>(
  key: string
): MemoizedSelector<(type: string) => T> =>
  createSelector(
    selectGetTypeActivityOption<T>(key),
    selectGetGlobalActivityOption<T>(key),
    partial2(getActivityOption)
  );

export const selectGetActivityLateralMargin = selectGetActivityOption<number>(
  'lateralMargin'
);
export const selectGetActivityStrokeWidth = selectGetActivityOption<number>(
  'strokeWidth'
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

function getActivityOption<T>(
  typeActivityOption: (type: string) => T,
  globalActivityOption: T,
  type: string
): T {
  return typeActivityOption(type) || globalActivityOption;
}
