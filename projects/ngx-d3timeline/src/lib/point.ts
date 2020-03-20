import { Orientation } from './orientation';

export interface Point {
  x: number;
  y: number;
}

export const origin: Point = {
  x: 0,
  y: 0
};

export function translatePoint(point: Point, offset: Point): Point {
  return { x: point.x + offset.x, y: point.y + offset.y };
}

export function translatePointInOrientation(
  point: Point,
  distance: number,
  orientation: Orientation
) {
  return orientation === Orientation.Vertical
    ? { ...point, y: point.y + distance }
    : { ...point, x: point.x + distance };
}
