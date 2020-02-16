import { ScaleBand, scaleBand } from 'd3-scale';
import { TimelineEvent } from '../timeline-event';
import { TimelineView } from '../view/timeline-view';
import { Orientation } from '../orientation';

export class ResourcesAxisViewModel {
  private readonly scaleBand: ScaleBand<string>;

  constructor(
    data: TimelineEvent[],
    timelineView: TimelineView,
    private readonly orientation: Orientation
  ) {
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
      .range(this.getRange(timelineView.bounds));
  }

  private getRange(bounds: any): [number, number] {
    return this.orientation === Orientation.Vertical
      ? [bounds.left, bounds.right]
      : [bounds.top, bounds.bottom];
  }

  private tickTransform(tick: string) {
    return this.orientation === Orientation.Vertical
      ? `translate(${this.getBandMidPoint(tick)}, 0)`
      : `translate(0, ${this.getBandMidPoint(tick)})`;
  }

  private getBandMidPoint(tick: string) {
    return this.mapToPixel(tick) + this.scaleBand.bandwidth() / 2;
  }

  mapToPixel(domain: string): number {
    return this.scaleBand(domain);
  }
}
