import { Orientation } from './orientation';

export function flipOrientation(orientation: Orientation) {
  return orientation === Orientation.Vertical
    ? Orientation.Horizontal
    : Orientation.Vertical;
}
