import { Scale, TimeScale, BandScale } from './scale-types';
import { Orientation } from '../core/orientation';

export interface OrientedScale<TScale extends Scale> {
  scale: TScale;
  orientation: Orientation;
}

export type OrientedTimeScale = OrientedScale<TimeScale>;
export type OrientedBandScale = OrientedScale<BandScale>;
