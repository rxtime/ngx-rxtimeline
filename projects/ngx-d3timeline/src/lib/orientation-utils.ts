import { Orientation } from './orientation';
import { Options } from './options';

export function getTimeOrientation(options: Options): Orientation {
  return options && Orientation[options.orientation];
}

export function flipOrientation(orientation: Orientation): Orientation {
  return orientation === Orientation.Vertical
    ? Orientation.Horizontal
    : Orientation.Vertical;
}
