import { TimelineEvent } from '../timeline-event';
import { TimeAxisViewModel } from '../time-axis/time-axis-view-model';
import { ResourcesAxisViewModel } from '../resources-axis/resources-axis-view-model';
import { Orientation } from '../orientation';

export class ContentViewModel {
  constructor(
    readonly data: TimelineEvent[],
    private timeAxisVm: TimeAxisViewModel,
    private resourcesAxisVm: ResourcesAxisViewModel,
    orientation: Orientation
  ) {}

  dataTransform(data: TimelineEvent) {
    return `translate(${this.resourcesAxisVm.mapToPixel(
      data.series
    )}, ${this.timeAxisVm.mapToPixel(data.start)})`;
  }

  rectHeight(data: TimelineEvent) {
    return (
      this.timeAxisVm.mapToPixel(data.finish) -
      this.timeAxisVm.mapToPixel(data.start)
    );
  }

  get bandwidth() {
    return this.resourcesAxisVm.bandwidth;
  }
}
