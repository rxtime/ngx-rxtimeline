import { Store } from './store';
import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { State } from './state';
import { ScaleBand, scaleBand } from 'd3-scale';
import { Orientation } from './orientation';
import { TimelineEvent } from './timeline-event';

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
      .range(this.getRange(state.view.bounds, state.orientation));
  }

  private getDomain(data: TimelineEvent[]): string[] {
    return [...new Set(data.map(d => d.series))];
  }

  private getRange(bounds: any, orientation: Orientation): [number, number] {
    return orientation === Orientation.Vertical
      ? [bounds.top, bounds.bottom]
      : [bounds.left, bounds.right];
  }
}
