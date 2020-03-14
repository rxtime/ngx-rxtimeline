import { TickMark } from './tick';
import { Line } from './line';

export interface Axis {
  tickMarks: TickMark[];
  line: Line;
}
