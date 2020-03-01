import { Injectable } from '@angular/core';
import { State } from './store/state';
import { TimeScale, BandScale } from './types';
import { Orientation } from './orientation';
import { scaleBand, scaleTime } from 'd3-scale';
import { TimelineEvent } from './timeline-event';
import { min, max } from 'd3-array';
import { TimelineView } from './view/timeline-view';

@Injectable({ providedIn: 'root' })
export class ScaleService {
  configureBandScale(state: State): BandScale {
    return scaleBand()
      .domain(this.getBandScaleDomain(state.data))
      .range(this.getRange(state.view, state.axisOrientations.resource));
  }

  configureTimeScale(state: State): TimeScale {
    return scaleTime()
      .domain(this.getTimeScaleDomain(state.data))
      .range(this.getRange(state.view, state.axisOrientations.time));
  }

  private getBandScaleDomain(data: TimelineEvent[]): string[] {
    return [...new Set(data.map(d => d.series))];
  }

  private getTimeScaleDomain(data: TimelineEvent[]): [Date, Date] {
    return [min(data, d => d.start), max(data, d => d.finish)];
  }

  private getRange(
    view: TimelineView,
    orientation: Orientation
  ): [number, number] {
    return orientation === Orientation.Vertical
      ? [view.top, view.bottom]
      : [view.left, view.right];
  }
}
