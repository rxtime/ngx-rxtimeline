import { Injectable } from '@angular/core';
import { State } from './state';
import { TimeScale, BandScale } from '../scale-types';
import { Orientation } from '../orientation';
import { AxisOrientations } from '../axis-orientations';
import { scaleBand, scaleTime } from 'd3-scale';
import { TimelineEvent } from '../timeline-event';
import { min, max } from 'd3-array';
import { TimelineView } from '../view/timeline-view';

@Injectable({ providedIn: 'root' })
export class ScaleService {
  rescaleTime(state: State, event: any): TimeScale {
    const timeScale = this.configureTimeScale(state);

    return state.axisOrientations.time === Orientation.Vertical
      ? event.transform.rescaleY(timeScale)
      : event.transform.rescaleX(timeScale);
  }

  setAxisOrientations(timeOrientation: Orientation): AxisOrientations {
    const resourceOrientation = this.flipOrientation(timeOrientation);
    return { time: timeOrientation, resource: resourceOrientation };
  }

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

  private flipOrientation(orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? Orientation.Horizontal
      : Orientation.Vertical;
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
