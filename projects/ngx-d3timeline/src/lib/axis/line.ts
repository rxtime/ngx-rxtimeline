import { Orientation } from '../orientation';

export interface Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export function createLine(
  x1: number,
  y1: number,
  length: number,
  orientation: Orientation
) {
  return orientation === Orientation.Vertical
    ? createVerticalLine(x1, y1, length)
    : createHorizontalLine(x1, y1, length);
}

export function createVerticalLine(x1: number, y1: number, length: number) {
  return {
    x1,
    y1,
    x2: x1,
    y2: y1 + length
  };
}

export function createHorizontalLine(x1: number, y1: number, length: number) {
  return {
    x1,
    y1,
    x2: x1 + length,
    y2: y1
  };
}
