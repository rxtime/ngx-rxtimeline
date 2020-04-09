export enum Orientation {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical'
}

export function flipOrientation(orientation: Orientation): Orientation {
  return orientation === Orientation.Vertical
    ? Orientation.Horizontal
    : Orientation.Vertical;
}

export function EitherOnOrientation<T>(
  orientation: Orientation,
  v: T,
  h: T
): T {
  return orientation === Orientation.Vertical ? v : h;
}
