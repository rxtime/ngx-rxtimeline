import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { flipOrientation, Orientation } from '../../core/orientation';
import { Options } from '../options';
import { AxisType } from '../../axis/axis';
import { createEnumSelector } from '../../store-lib/selector/selector-utils';
import { constSelector } from '../../store-lib/selector/selector';

export const selectTimeOrientation = createSelector(
  selectOptions,
  getTimeOrientation
);

function getTimeOrientation(options: Options): Orientation {
  return Orientation[options.orientation];
}

const selectResourceOrientation = createSelector(
  selectTimeOrientation,
  flipOrientation
);

export const selectAxisOrientation = (axisType: AxisType) =>
  createEnumSelector<AxisType, Orientation>({
    Resources: selectResourceOrientation,
    Time: selectTimeOrientation
  })(constSelector(axisType));

export const selectStrokeWidth = createSelector(
  selectOptions,
  options => options.strokeWidth
);
