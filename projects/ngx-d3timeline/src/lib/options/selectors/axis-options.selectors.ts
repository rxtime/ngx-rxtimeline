import { selectOptions } from '../../store/state';
import { createSelector } from '../../store-lib/selector/create-selector';
import { AxisOptions } from '../options';

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

function getShowGridLines(axisOptions: AxisOptions): boolean {
  return axisOptions.showGridLines;
}

export const selectResourceAxisShowAxisLine = createSelector(
  selectResourceAxisOptions,
  getShowAxisLine
);

export const selectTimeAxisShowAxisLines = createSelector(
  selectTimeAxisOptions,
  getShowAxisLine
);

function getShowAxisLine(axisOptions: AxisOptions): boolean {
  return axisOptions.showAxisLine;
}

export const selectResourceAxisTickLineOffset = createSelector(
  selectResourceAxisOptions,
  getTickLineOffset
);

export const selectTimeAxisTickLineOffset = createSelector(
  selectTimeAxisOptions,
  getTickLineOffset
);

function getTickLineOffset(axisOptions: AxisOptions): number {
  return axisOptions.tickLineLength * -1;
}

export const selectResourceAxisFontFace = createSelector(
  selectResourceAxisOptions,
  getFontFace
);

export const selectTimeAxisFontFace = createSelector(
  selectTimeAxisOptions,
  getFontFace
);

function getFontFace(axisOptions: AxisOptions): string {
  return axisOptions.fontFace;
}

export const selectResourceAxisFontSize = createSelector(
  selectResourceAxisOptions,
  getFontSize
);

export const selectTimeAxisFontSize = createSelector(
  selectTimeAxisOptions,
  getFontSize
);

function getFontSize(axisOptions: AxisOptions): number {
  return axisOptions.fontSize;
}
