import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { flipOrientation } from '../../core/orientation';
import {
  getTimeOrientation,
  getShowGridLines,
  getTypeOptions,
  getTypeActivityOptions,
  getActivityPadding,
  getTypeActivityPadding
} from '../options-utils';
import { selectTypeActivityPadding } from './type-options.selectors';
import { selectActivityOptionsPadding } from './activity-options.selectors';

export const selectTimeOrientation = createSelector(
  selectOptions,
  getTimeOrientation
);
export const selectResourceOrientation = createSelector(
  selectTimeOrientation,
  flipOrientation
);

export const selectAcivityPadding = createSelector(
  selectTypeActivityPadding,
  selectActivityOptionsPadding,
  (typeActivityPadding, activityOptionsPadding) =>
    getActivityPadding.bind(null, typeActivityPadding, activityOptionsPadding)
);
