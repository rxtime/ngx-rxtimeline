import { Line } from './line';
import { Point } from '../point';

export interface TickMark {
  label: string;
  labelOffset: Point;
  transform: string;
  line: Line;
}
