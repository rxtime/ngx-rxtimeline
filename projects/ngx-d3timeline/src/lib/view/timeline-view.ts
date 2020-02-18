export class TimelineView {
  readonly width: number;
  readonly height: number;
  readonly margin: number;

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
  }

  get bounds(): { left: number; right: number; top: number; bottom: number } {
    return {
      bottom: this.height - this.margin,
      left: 0,
      right: this.width - this.margin,
      top: 0
    };
  }
}
