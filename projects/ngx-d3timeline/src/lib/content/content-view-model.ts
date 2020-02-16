import { TimelineEvent } from '../timeline-event';
import { TimeAxisViewModel } from '../time-axis/time-axis-view-model';
import { ResourcesAxisViewModel } from '../resources-axis/resources-axis-view-model';
import { Orientation } from '../orientation';

export class ContentViewModel {
  constructor(
    readonly data: TimelineEvent[],
    private timeAxisVm: TimeAxisViewModel,
    private resourcesAxisVm: ResourcesAxisViewModel,
    private readonly orientation: Orientation
  ) {}

  dataTransform(data: TimelineEvent) {
    if (this.orientation == Orientation.Vertical) {
      return `translate(${this.resourcesAxisVm.mapToPixel(
        data.series
      )}, ${this.timeAxisVm.mapToPixel(data.start)})`;
    } else {
      return `translate(${this.timeAxisVm.mapToPixel(
        data.start
      )}, ${this.resourcesAxisVm.mapToPixel(data.series)})`;
    }
  }

  rectHeight(data: TimelineEvent) {
    return this.orientation == Orientation.Vertical
      ? this.rectTimeBreadth(data)
      : this.rectResourceBreadth;
  }

  rectWidth(data: TimelineEvent) {
    return this.orientation == Orientation.Vertical
      ? this.rectResourceBreadth
      : this.rectTimeBreadth(data);
  }

  private rectTimeBreadth(data: TimelineEvent) {
    return (
      this.timeAxisVm.mapToPixel(data.finish) -
      this.timeAxisVm.mapToPixel(data.start)
    );
  }

  private get rectResourceBreadth() {
    return this.resourcesAxisVm.bandwidth;
  }
}
