export class TimelineView {
  readonly width: number;
  readonly height: number;
  readonly margin: number;

  readonly bottom: number;
  readonly left: number;
  readonly right: number;
  readonly top: number;

  constructor({
    width,
    height,
    margin
  }: {
    width: number;
    height: number;
    margin: number;
  }) {
    this.width = width;
    this.height = height;
    this.margin = margin;

    this.bottom = height - margin;
    this.left = margin;
    this.right = width - margin;
    this.top = margin;
  }
}
