import { selectOptions } from '../store/state';
import { createSelector } from '../store-lib/selector/create-selector';
import {
  getShowGridLines,
  getTickLineOffset,
  getShowAxisLine,
  getFontFace,
  getFontSize
} from './options-utils';

export const selectResourceAxisOptions = createSelector(
  selectOptions,
  options => options.resourceAxis
);

export const selectTimeAxisOptions = createSelector(
  selectOptions,
  options => options.timeAxis
);

export const selectResourceAxisShowGridLines = createSelector(
  selectResourceAxisOptions,
  getShowGridLines
);

export const selectTimeAxisShowGridLines = createSelector(
  selectTimeAxisOptions,
  getShowGridLines
);

export const selectResourceAxisShowAxisLine = createSelector(
  selectResourceAxisOptions,
  getShowAxisLine
);

export const selectTimeAxisShowAxisLines = createSelector(
  selectTimeAxisOptions,
  getShowAxisLine
);

export const selectResourceAxisTickLineOffset = createSelector(
  selectResourceAxisOptions,
  getTickLineOffset
);

export const selectTimeAxisTickLineOffset = createSelector(
  selectTimeAxisOptions,
  getTickLineOffset
);

export const selectResourceAxisFontFace = createSelector(
  selectResourceAxisOptions,
  getFontFace
);

export const selectTimeAxisFontFace = createSelector(
  selectTimeAxisOptions,
  getFontFace
);

export const selectResourceAxisFontSize = createSelector(
  selectResourceAxisOptions,
  getFontSize
);

export const selectTimeAxisFontSize = createSelector(
  selectTimeAxisOptions,
  getFontSize
);
