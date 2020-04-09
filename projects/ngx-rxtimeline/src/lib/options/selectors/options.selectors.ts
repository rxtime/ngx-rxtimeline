import { createSelector } from '../../store-lib/selector/create-selector';
import { selectOptions } from '../../store/state';
import { flipOrientation, Orientation } from '../../core/orientation';
import { Options } from '../options';

export const selectTimeOrientation = createSelector(
  selectOptions,
  getTimeOrientation
);

function getTimeOrientation(options: Options): Orientation {
  return options && Orientation[options.orientation];
}

export const selectResourceOrientation = createSelector(
  selectTimeOrientation,
  flipOrientation
);

export const selectStrokeWidth = createSelector(
  selectOptions,
  options => options.strokeWidth
);
