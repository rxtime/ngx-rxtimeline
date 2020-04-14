import { Orientation } from './orientation';
import { Point, translatePointInOrientation, origin } from './point';
import { partial } from './partial';

export interface Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export const createOrientedLineFromOrigin = partial(createOrientedLine, origin);

export function createOrientedLine(
  point: Point,
  length: number,
  orientation: Orientation
): Line {
  const to = translatePointInOrientation(point, length, orientation);

  return createLine(point, to);
}

export function createLine(from: Point, to: Point) {
  return {
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y
  };
}
