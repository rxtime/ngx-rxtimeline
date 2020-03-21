import { Line } from '../core/line';
import { Point } from '../core/point';

export interface TickMark {
  label: string;
  labelOffset: Point;
  transform: string;
  line: Line;
}
