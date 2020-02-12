import { ScaleBand, scaleBand } from 'd3-scale';
import { TimelineEvent } from '../timeline-event';
import { View } from '../view/view';

export class SeriesAxisViewModel {
  private readonly scaleBand: ScaleBand<string>;

  constructor(data: TimelineEvent[], view: View) {
    this.scaleBand = this.configureScaleBand(data, view);
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

  private configureScaleBand(data: TimelineEvent[], view: View) {
    return scaleBand()
      .domain([...new Set(data.map(d => d.series))])
      .range([0, view.width - view.margin]);
  }

  private tickTransform(tick: string) {
    return `translate(${this.scaleBand(tick) +
      this.scaleBand.bandwidth() / 2}, 0)`;
  }
}
