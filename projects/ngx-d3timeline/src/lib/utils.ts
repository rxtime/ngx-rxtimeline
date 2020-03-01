import { Orientation } from './orientation';
import { AxisOrientations } from './axis-orientations';

export function setAxisOrientations(
  timeOrientation: Orientation
): AxisOrientations {
  const resourceOrientation = this.flipOrientation(timeOrientation);
  return { time: timeOrientation, resource: resourceOrientation };
}

export function flipOrientation(orientation: Orientation) {
  return orientation === Orientation.Vertical
    ? Orientation.Horizontal
    : Orientation.Vertical;
}
