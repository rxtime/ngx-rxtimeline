import { Store } from './store';
import { Injectable } from '@angular/core';
import { map, share, switchMap } from 'rxjs/operators';
import { State } from './state';
import { scaleBand, scaleTime } from 'd3-scale';
import { Orientation } from './orientation';
import { TimelineEvent } from './timeline-event';
import { TimelineView } from './view/timeline-view';
import { min, max } from 'd3-array';
import { EventService } from './event.service';
import { TimeScale, BandScale } from './scale-types';

@Injectable({ providedIn: 'root' })
export class ScalesService {
  scales$ = this.store.state$.pipe(
    map(state => ({
      scaleBand: this.configureScaleBand(state),
      scaleTime: this.configureScaleTime(state),
      state
    })),
    switchMap(scales =>
      this.eventService.event$.pipe(
        map(event =>
          event
            ? {
                ...scales,
                scaleTime: this.rescaleTime(
                  scales.scaleTime,
                  scales.state.axisOrientations.timeOrientation,
                  event
                )
              }
            : scales
        ),
        share()
      )
    )
  );

  constructor(
    private store: Store,

    private eventService: EventService
  ) {}

  private configureScaleBand(state: State): BandScale {
    return scaleBand()
      .domain(this.getBandScaleDomain(state.data))
      .range(
        this.getRange(state.view, state.axisOrientations.resourceOrientation)
      );
  }

  private configureScaleTime(state: State): TimeScale {
    return scaleTime()
      .domain(this.getTimeScaleDomain(state.data))
      .range(this.getRange(state.view, state.axisOrientations.timeOrientation));
  }

  private rescaleTime(
    scale: TimeScale,
    orientation: Orientation,
    event: any
  ): TimeScale {
    return orientation === Orientation.Vertical
      ? event.transform.rescaleY(scale)
      : event.transform.rescaleX(scale);
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
