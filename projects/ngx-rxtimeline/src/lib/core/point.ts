import { Orientation } from './orientation';
import { partial } from './partial';

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

export const translateOriginInOrientation = partial(
  translatePointInOrientation,
  origin
);

const orientationToAxis = {
  [Orientation.Vertical]: 'y',
  [Orientation.Horizontal]: 'x'
};

export function translatePointInOrientation(
  point: Point,
  distance: number,
  orientation: Orientation
): Point {
  return {
    ...point,
    [orientationToAxis[orientation]]:
      point[orientationToAxis[orientation]] + distance
  };
}

export function movePointInOrientation(
  moveTo: number,
  point: Point,
  orientation: Orientation
): Point {
  return { ...point, [orientationToAxis[orientation]]: moveTo };
}

export function pointToTransform(point: Point): string {
  return `translate(${point.x}, ${point.y})`;
}
