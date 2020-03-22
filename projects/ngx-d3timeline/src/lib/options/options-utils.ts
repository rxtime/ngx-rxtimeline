import { Orientation } from '../core/orientation';
import { Options, AxisOptions } from './options';

export function getTimeOrientation(options: Options): Orientation {
  return options && Orientation[options.orientation];
}

export function getShowGridLines(axisOptions: AxisOptions) {
  return axisOptions.showGridLines;
}
