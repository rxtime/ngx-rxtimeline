import { TickInfo } from './tick-info';
import { Line } from './line';

export interface AxisViewModel {
  tickInfos: TickInfo[];
  axisLine: Line;
}
