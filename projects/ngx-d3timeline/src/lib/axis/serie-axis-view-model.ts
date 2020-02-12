import { ScaleBand, scaleBand } from 'd3-scale';
import { TimelineEvent } from '../timeline-event';
import { View } from '../view/view';

export class SeriesAxisViewModel {
  private readonly bandscale: ScaleBand<string>;

  constructor(data: TimelineEvent[], view: View) {
    this.bandscale = this.createBandscale(data, view);
  }

  get tickInfos(): { label: string; transform: string }[] {
    return this.bandscale.domain().map(tick => ({
      label: tick,
      transform: this.tickTransform(tick)
    }));
  }

  get rangeLimit() {
    return this.bandscale.range()[1];
  }

  get bandwidth() {
    return this.bandscale.bandwidth();
  }

  private createBandscale(data: TimelineEvent[], view: View) {
    return scaleBand()
      .domain([...new Set(data.map(d => d.series))])
      .range([0, view.width - view.margin]);
  }

  private tickTransform(tick: string) {
    return `translate(${this.bandscale(tick) +
      this.bandscale.bandwidth() / 2}, 0)`;
  }
}
