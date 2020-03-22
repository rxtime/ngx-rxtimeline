export const margin = 50;

export class View {
  readonly width: number;
  readonly height: number;

  readonly left = margin;
  readonly top = margin;
  readonly right: number;
  readonly bottom: number;

  constructor([width, height]: [number, number]) {
    this.width = width;
    this.height = height;

    this.bottom = height - margin;
    this.right = width - margin;
  }
}
