import { scaleBand, ScaleBand, scaleTime, ScaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { TimelineEvent } from './timeline-event';
import { TimelineView } from './view/timeline-view';
import { Orientation } from './orientation';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScaleService {
  configureScaleBand(
    data: TimelineEvent[],
    timelineView: TimelineView,
    orientation: Orientation
  ): ScaleBand<string> {
    return scaleBand()
      .domain(this.getScaleBandDomain(data))
      .range(this.getRange(timelineView.bounds, orientation));
  }

  configureScaleTime(
    data: TimelineEvent[],
    timelineView: TimelineView,
    orientation: Orientation,
    event: any
  ) {
    const scale = scaleTime()
      .domain(this.getScaleTimeDomain(data))
      .range(this.getRange(timelineView.bounds, orientation));

    return this.rescaleAxis(scale, orientation, event);
  }

  private rescaleAxis(
    scale: ScaleTime<number, number> | ScaleBand<string>,
    orientation: Orientation,
    event: any
  ) {
    return event
      ? this.transformAxis(scale, orientation, event.transform)
      : scale;
  }

  private transformAxis(
    scale: ScaleTime<number, number> | ScaleBand<string>,
    orientation: Orientation,
    transform: any
  ) {
    return orientation === Orientation.Vertical
      ? transform.rescaleY(scale)
      : transform.rescaleX(scale);
  }

  private getScaleBandDomain(data: TimelineEvent[]): string[] {
    return [...new Set(data.map(d => d.series))];
  }

  private getScaleTimeDomain(data: TimelineEvent[]): [Date, Date] {
    return [min(data, d => d.start), max(data, d => d.finish)];
  }

  private getRange(bounds: any, orientation: Orientation): [number, number] {
    return orientation === Orientation.Vertical
      ? [bounds.top, bounds.bottom]
      : [bounds.left, bounds.right];
  }
}
