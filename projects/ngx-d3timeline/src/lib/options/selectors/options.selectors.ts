import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { flipOrientation } from '../../core/orientation';
import { getTimeOrientation } from '../options-utils';
import { selectTypeActivityOption } from './type-options.selectors';
import { selectGlobalActivityOption } from './activity-options.selectors';
import { MemoizedSelector } from '../../store-lib/selector/memoized-selector';
import { partial2 } from '../../core/function-utils';

export const selectTimeOrientation = createSelector(
  selectOptions,
  getTimeOrientation
);
export const selectResourceOrientation = createSelector(
  selectTimeOrientation,
  flipOrientation
);

const selectActivityOption = <T>(
  key: string
): MemoizedSelector<(type: string) => T> =>
  createSelector(
    selectTypeActivityOption<T>(key),
    selectGlobalActivityOption<T>(key),
    partial2(getActivityOption)
  );

export const selectAcivityPadding = selectActivityOption<number>('padding');
export const selectActivityStrokeWidth = selectActivityOption<number>(
  'strokeWidth'
);
export const selectActivityDisableDrag = selectActivityOption<number>(
  'disableDrag'
);
export const selectActivityFontFace = selectActivityOption<string>('fontFace');
export const selectActivityFontSize = selectActivityOption<number>('fontSize');

function getActivityOption<T>(
  typeActivityOption: (type: string) => T,
  globalActivityOption: T,
  type: string
): T {
  return typeActivityOption(type) || globalActivityOption;
}
