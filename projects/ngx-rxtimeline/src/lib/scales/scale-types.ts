import { ScaleBand, ScaleTime } from 'd3-scale';

export type BandScale = ScaleBand<string>;
export type InverseBandScale = (value: number) => string;
export type TimeScale = ScaleTime<number, number>;
export type Scale = BandScale | TimeScale;
