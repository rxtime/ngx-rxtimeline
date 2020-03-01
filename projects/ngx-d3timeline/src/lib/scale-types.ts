import { ScaleBand, ScaleTime } from 'd3-scale';
import { State } from './store/state';

export type BandScale = ScaleBand<string>;
export type TimeScale = ScaleTime<number, number>;
export type Scale = BandScale | TimeScale;

export type StateWithScales = State & {
  bandScale: BandScale;
  timeScale: TimeScale;
};
