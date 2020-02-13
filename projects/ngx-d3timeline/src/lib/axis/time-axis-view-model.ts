import { scaleTime, ScaleTime } from 'd3-scale';
import { max, min } from 'd3-array';
import { TimelineEvent } from '../timeline-event';
import { TimelineView } from '../view/timeline-view';

export class TimeAxisViewModel {
  readonly scaleTime: ScaleTime<number, number>;

  constructor(data: TimelineEvent[], timelineView: TimelineView, event: any) {
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
      .range([0, timelineView.bounds.bottom]);

    return event ? event.transform.rescaleY(scale) : scale;
  }

  private tickTransform(tick: Date) {
    return `translate(0,${this.scaleTime(tick)})`;
  }
}
