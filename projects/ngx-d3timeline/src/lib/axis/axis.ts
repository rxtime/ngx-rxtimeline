import { Tick } from './tick';
import { Line } from './line';

export interface Axis {
  ticks: Tick[];
  axisLine: Line;
}
