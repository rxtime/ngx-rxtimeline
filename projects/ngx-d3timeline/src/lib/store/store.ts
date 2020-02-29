import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ActionTypes } from './actions';
import { tap, shareReplay, scan } from 'rxjs/operators';
import { initialState } from './state';
import { State } from './state';
import { Orientation } from '../orientation';
import { AxisOrientations } from '../axis-orientations';
import { TimelineView } from '../view/timeline-view';
import { TimeScale, BandScale } from '../scale-types';
import { scaleTime, scaleBand } from 'd3-scale';
import { TimelineEvent } from '../timeline-event';
import { max, min } from 'd3-array';
import { Actions } from './actions';

@Injectable({ providedIn: 'root' })
export class Store {
  private actionsSubject = new ReplaySubject<Actions>(256);

  state$ = this.actionsSubject.pipe(
    tap(console.log),
    scan((state, action) => this.reducer(state, action), initialState),
    shareReplay()
  );

  dispatch(action: any) {
    this.actionsSubject.next(action);
  }

  private reducer(state: State, action: any): State {
    switch (action.type) {
      case ActionTypes.DataChanged: {
        return this.foo(state, { data: action.payload });
      }

      case ActionTypes.OrientationChanged: {
        return this.foo(state, {
          axisOrientations: this.setAxisOrientations(action.payload)
        });
      }

      case ActionTypes.ViewChanged: {
        return this.foo(state, {
          view: new TimelineView({
            width: action.payload[0],
            height: action.payload[1]
          })
        });
      }

      case ActionTypes.ZoomEvent: {
        return { ...state, timeScale: this.rescaleTime(state, action.payload) };
      }
    }

    return state;
  }

  private foo(state: State, bar: Partial<State>) {
    const stateCopy = { ...state, ...bar };
    return {
      ...stateCopy,
      timeScale: this.configureTimeScale(stateCopy),
      bandScale: this.configureBandScale(stateCopy)
    };
  }

  private rescaleTime(state: State, event: any): TimeScale {
    const timeScale = this.configureTimeScale(state);

    return state.axisOrientations.time === Orientation.Vertical
      ? event.transform.rescaleY(timeScale)
      : event.transform.rescaleX(timeScale);
  }

  setAxisOrientations(timeOrientation: Orientation): AxisOrientations {
    const resourceOrientation = this.flipOrientation(timeOrientation);
    return { time: timeOrientation, resource: resourceOrientation };
  }

  private flipOrientation(orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? Orientation.Horizontal
      : Orientation.Vertical;
  }

  private configureBandScale(state: State): BandScale {
    return scaleBand()
      .domain(this.getBandScaleDomain(state.data))
      .range(this.getRange(state.view, state.axisOrientations.resource));
  }

  private configureTimeScale(state: State): TimeScale {
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
