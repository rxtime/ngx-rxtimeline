import { createSelector } from './memoized-selector';
import { selectData, selectView, selectResourceOrientation } from './state'; // TODO use barelling?
import { configureBandScale, configureTimeScale } from '../scale-utils';

export const selectBandScale = createSelector(
  [selectData, selectView, selectResourceOrientation],
  configureBandScale
);

export const selectTimeScale = createSelector(
  [selectData, selectView, selectResourceOrientation],
  configureTimeScale
);
