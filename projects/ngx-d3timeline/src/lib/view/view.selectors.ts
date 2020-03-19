import { selectView } from '../store/state';
import { getViewTopLeft } from './view-utils';
import { createSelector } from '../selector/create-selector';

export const selectViewTopLeft = createSelector(selectView, getViewTopLeft);
