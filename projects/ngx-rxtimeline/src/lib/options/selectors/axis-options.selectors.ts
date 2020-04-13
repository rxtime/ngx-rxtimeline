import { selectOptions } from '../../store/state';
import { createSelector } from '../../store-lib/selector/create-selector';
import { AxisOptions } from '../options';
import { createOptionsBasedSelector } from '../../store-lib/selector/selector-utils';
import { AxisType } from '../../axis/axis';
import { Complete } from '../../core/types';
import { constSelector } from '../../store-lib/selector/selector';
import { negate } from '../../core/function-utils';

const selectResourceAxisOptions = createSelector(
  selectOptions,
  options => options.resourceAxis
);

const selectTimeAxisOptions = createSelector(
  selectOptions,
  options => options.timeAxis
);

const selectAxisOptions = (axisType: AxisType) =>
  createOptionsBasedSelector<AxisType, Complete<AxisOptions>>({
    Resources: selectResourceAxisOptions,
    Time: selectTimeAxisOptions
  })(constSelector(axisType));

const selectAxisOption = <TOption extends keyof AxisOptions>(key: TOption) => (
  axisType: AxisType
) => createSelector(selectAxisOptions(axisType), options => options[key]);

export const selectAxisShowGridLines = selectAxisOption('showGridLines');
export const selectAxisShowAxisLine = selectAxisOption('showAxisLine');
export const selectAxisFontFace = selectAxisOption('fontFace');
export const selectAxisFontSize = selectAxisOption('fontSize');

const selectAxisTickLineLength = selectAxisOption('tickLineLength');
export const selectAxisTickLineOffset = (axisType: AxisType) =>
  createSelector(selectAxisTickLineLength(axisType), negate);
