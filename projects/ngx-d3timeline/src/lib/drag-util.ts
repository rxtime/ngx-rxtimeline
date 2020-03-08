export function pointToTransform(point: { x: number; y: number }): string {
  return `translate(${point.x}, ${point.y})`;
}
