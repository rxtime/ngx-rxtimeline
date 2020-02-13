import { scaleTime, ScaleTime } from 'd3-scale';
import { max, min } from 'd3-array';
import { TimelineEvent } from '../timeline-event';
import { TimelineView } from '../view/timeline-view';
import { Orientation } from '../orientation';

export class TimeAxisViewModel {
  readonly scaleTime: ScaleTime<number, number>;

  constructor(
    data: TimelineEvent[],
    timelineView: TimelineView,
    event: any,
    private readonly orientation: Orientation
  ) {
    this.scaleTime = this.configureScaleTime(data, timelineView, event);
  }

  get tickInfos(): { label: string; transform: string }[] {
    return this.scaleTime.ticks().map(tick => ({
      label: this.scaleTime.tickFormat()(tick),
      transform: this.tickTransform(tick)
    }));
  }

  get rangeLimit() {
    return this.scaleTime.range()[1];
  }

  private configureScaleTime(
    data: TimelineEvent[],
    timelineView: TimelineView,
    event: any
  ) {
    const scale = scaleTime()
      .domain([min(data, d => d.start), max(data, d => d.finish)])
      .range(this.getRange(timelineView.bounds));

    return event ? this.getTransformedScale(scale, event) : scale;
  }

  private getRange(bounds: any) {
    return this.orientation === Orientation.Vertical
      ? [bounds.top, bounds.bottom]
      : [bounds.left, bounds.right];
  }

  private tickTransform(tick: Date) {
    return this.orientation === Orientation.Vertical
      ? `translate(0,${this.scaleTime(tick)})`
      : `translate(${this.scaleTime(tick)}, 0)`;
  }
  private getTransformedScale(scale: ScaleTime<number, number>, event: any) {
    return this.orientation === Orientation.Vertical
      ? event.transform.rescaleY(scale)
      : event.transform.rescaleX(scale);
  }
}
