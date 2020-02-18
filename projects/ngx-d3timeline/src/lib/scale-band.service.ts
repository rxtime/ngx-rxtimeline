import { scaleBand, ScaleBand } from 'd3-scale';
import { TimelineEvent } from './timeline-event';
import { TimelineView } from './view/timeline-view';
import { Orientation } from './orientation';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScaleBandService {
  configureScaleBand(
    data: TimelineEvent[],
    timelineView: TimelineView,
    orientation: Orientation
  ): ScaleBand<string> {
    return scaleBand()
      .domain(this.getScaleBandDomain(data))
      .range(this.getRange(timelineView.bounds, orientation));
  }

  private getScaleBandDomain(data: TimelineEvent[]): string[] {
    return [...new Set(data.map(d => d.series))];
  }

  private getRange(bounds: any, orientation: Orientation): [number, number] {
    return orientation === Orientation.Vertical
      ? [bounds.top, bounds.bottom]
      : [bounds.left, bounds.right];
  }
}
