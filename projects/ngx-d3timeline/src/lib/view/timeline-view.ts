export class TimelineView {
  constructor(
    readonly width: number,
    readonly height: number,
    readonly margin: number
  ) {}

  get bounds(): { left: number; right: number; top: number; bottom: number } {
    return {
      bottom: this.height - this.margin,
      left: 0,
      right: this.width - this.margin,
      top: 0
    };
  }
}
