export class View {
  static margin = 50;

  readonly width: number;
  readonly height: number;

  readonly left = View.margin;
  readonly top = View.margin;
  readonly right: number;
  readonly bottom: number;

  constructor([width, height]: [number, number]) {
    this.width = width;
    this.height = height;

    this.bottom = height - View.margin;
    this.right = width - View.margin;
  }
}
