import { scaleBand, ScaleBand } from 'd3-scale';
import { TimelineEvent } from './timeline-event';
import { State } from './state';
import { Orientation } from './orientation';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScaleBandService {
  configureScaleBand(state: State): ScaleBand<string> {
    return scaleBand()
      .domain(this.getScaleBandDomain(state.data))
      .range(this.getRange(state.view.bounds, state.orientation));
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
