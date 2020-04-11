export enum Orientation {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical'
}

export function flipOrientation(orientation: Orientation): Orientation {
  return orientation === Orientation.Vertical
    ? Orientation.Horizontal
    : Orientation.Vertical;
}
