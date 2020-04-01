export class View {
  static margin = 50;

  readonly width: number;
  readonly height: number;

  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;

  constructor([width, height]: [number, number]) {
    this.width = width;
    this.height = height;

    this.left = Math.min(View.margin, width);
    this.top = Math.min(View.margin, height);
    this.bottom = Math.max(height - View.margin, 0);
    this.right = Math.max(width - View.margin, 0);
  }

  get isEmpty(): boolean {
    return !(this.width && this.height);
  }
}
