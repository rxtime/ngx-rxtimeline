import { Point } from './point';

export function pointToTransform(point: Point): string {
  return `translate(${point.x}, ${point.y})`;
}
