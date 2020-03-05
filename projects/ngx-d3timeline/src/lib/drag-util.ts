export function pointToTransform(point: { x: number; y: number }) {
  return `translate(${point.x}, ${point.y})`;
}
