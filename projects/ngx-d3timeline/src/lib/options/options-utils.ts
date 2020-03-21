import { Orientation } from '../core/orientation';
import { Options } from './options';

export function getTimeOrientation(options: Options): Orientation {
  return options && Orientation[options.orientation];
}
