export class View {
  readonly width: number;
  readonly height: number;
  readonly margin = 50;

  readonly left = this.margin;
  readonly top = this.margin;
  readonly right: number;
  readonly bottom: number;

  constructor([width, height]: [number, number]) {
    this.width = width;
    this.height = height;

    this.bottom = height - this.margin;
    this.right = width - this.margin;
  }
}
