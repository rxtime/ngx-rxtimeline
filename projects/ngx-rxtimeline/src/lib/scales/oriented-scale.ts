import { Scale } from './scale-types';
import { Orientation } from '../core/orientation';

export interface OrientedScale<TScale extends Scale> {
  scale: TScale;
  orientation: Orientation;
}

export function getOrientedScale<TScale extends Scale>(
  scale: TScale,
  orientation: Orientation
) {
  return { scale, orientation };
}
