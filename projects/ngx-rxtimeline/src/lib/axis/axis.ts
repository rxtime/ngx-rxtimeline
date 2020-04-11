import { TickMark } from '../tick-mark/tick-mark';
import { Line } from '../core/line';
import { Orientation } from '../core/orientation';

export interface Axis {
  tickMarks: TickMark[];
  line: Line;
  showGridLines: boolean;
  gridLines: Line[];
  orientation: Orientation;
}

export enum AxisType {
  Time = 'Time',
  Resources = 'Resources'
}
