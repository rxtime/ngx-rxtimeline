import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { flipOrientation } from '../../core/orientation';
import { getTimeOrientation, getActivityPadding } from '../options-utils';
import {
  selectTypeActivityPadding,
  selectTypeActivityStrokeWidth
} from './type-options.selectors';
import {
  selectActivityOptionsPadding,
  selectActivityOptionsStrokeWidth
} from './activity-options.selectors';

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

export const selectActivityStrokeWidth = createSelector(
  selectTypeActivityStrokeWidth,
  selectActivityOptionsStrokeWidth,
  (typeActivityStrokeWidth, activityOptionsStrokeWidth) =>
    getActivityPadding.bind(
      null,
      typeActivityStrokeWidth,
      activityOptionsStrokeWidth
    )
);
