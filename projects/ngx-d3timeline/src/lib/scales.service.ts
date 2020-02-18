import { Store } from './store';
import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { State } from './state';
import { ScaleBand, scaleBand } from 'd3-scale';
import { Orientation } from './orientation';
import { TimelineEvent } from './timeline-event';
import { TimelineView } from './view/timeline-view';

@Injectable({ providedIn: 'root' })
export class ScalesService {
  scales$ = this.store.state$.pipe(
    map(state => ({
      scaleBand: this.configureScaleBand(state),
      state
    })),
    share()
  );

  constructor(private store: Store) {}

  private configureScaleBand(state: State): ScaleBand<string> {
    return scaleBand()
      .domain(this.getDomain(state.data))
      .range(this.getRange(state.view, state.timelineOrientation));
  }

  private getDomain(data: TimelineEvent[]): string[] {
    return [...new Set(data.map(d => d.series))];
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
