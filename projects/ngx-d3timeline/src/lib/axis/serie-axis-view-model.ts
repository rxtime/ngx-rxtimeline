import { ScaleBand, scaleBand } from 'd3-scale';
import { TimelineEvent } from '../timeline-event';
import { TimelineView } from '../view/timeline-view';

export class SeriesAxisViewModel {
  private readonly scaleBand: ScaleBand<string>;

  constructor(data: TimelineEvent[], timelineView: TimelineView) {
    this.scaleBand = this.configureScaleBand(data, timelineView);
  }

  get tickInfos(): { label: string; transform: string }[] {
    return this.scaleBand.domain().map(tick => ({
      label: tick,
      transform: this.tickTransform(tick)
    }));
  }

  get rangeLimit() {
    return this.scaleBand.range()[1];
  }

  get bandwidth() {
    return this.scaleBand.bandwidth();
  }

  private configureScaleBand(
    data: TimelineEvent[],
    timelineView: TimelineView
  ) {
    return scaleBand()
      .domain([...new Set(data.map(d => d.series))])
      .range([timelineView.bounds.left, timelineView.bounds.right]);
  }

  private tickTransform(tick: string) {
    return `translate(${this.scaleBand(tick) +
      this.scaleBand.bandwidth() / 2}, 0)`;
  }
}
