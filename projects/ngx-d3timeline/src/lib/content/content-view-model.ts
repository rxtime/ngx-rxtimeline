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
    return `translate(${this.getEventX(data)}, ${this.getEventY(data)})`;
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

  private getEventX(data: TimelineEvent) {
    return this.orientation == Orientation.Vertical
      ? this.positionInResourceAxis(data)
      : this.positionInTimeAxis(data);
  }

  private getEventY(data: TimelineEvent) {
    return this.orientation == Orientation.Vertical
      ? this.positionInTimeAxis(data)
      : this.positionInResourceAxis(data);
  }

  private positionInResourceAxis(data: TimelineEvent): number {
    return this.resourcesAxisVm.mapToPixel(data.series);
  }

  private positionInTimeAxis(data: TimelineEvent): number {
    return this.timeAxisVm.mapToPixel(data.start);
  }

  private rectTimeBreadth(data: TimelineEvent): number {
    return (
      this.timeAxisVm.mapToPixel(data.finish) -
      this.timeAxisVm.mapToPixel(data.start)
    );
  }

  private get rectResourceBreadth(): number {
    return this.resourcesAxisVm.bandwidth;
  }
}
