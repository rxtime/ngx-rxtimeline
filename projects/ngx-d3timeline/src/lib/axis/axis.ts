import { TickMark } from '../tick-mark/tick-mark';
import { Line } from './line';

export interface Axis {
  tickMarks: TickMark[];
  line: Line;
}
