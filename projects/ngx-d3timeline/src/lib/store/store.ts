import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ActionType } from './actions';
import { shareReplay, scan, map } from 'rxjs/operators';
import { initialState } from './state';
import { State } from './state';
import { TimelineView } from '../view/timeline-view';
import { Actions } from './actions';
import { OptionsService } from '../options.service';
import { Selector } from './selector';
import { rescaleTime } from '../scale-utils';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBufferSize = 100;
  private actionsSubject = new ReplaySubject<Actions>(this.replayBufferSize);

  constructor(private optionsService: OptionsService) {}

  state$ = this.actionsSubject.pipe(
    scan(this.reducer.bind(this), initialState),
    shareReplay()
  );

  dispatch(action: Actions) {
    this.actionsSubject.next(action);
  }

  select(selector: Selector) {
    return this.state$.pipe(map(state => selector.execute(state)));
  }

  private reducer(state: State, action: Actions): State {
    switch (action.type) {
      case ActionType.DataChanged: {
        return { ...state, data: action.payload };
      }

      case ActionType.OrientationChanged: {
        return {
          ...state,
          axisOrientations: this.optionsService.setAxisOrientations(
            action.payload
          )
        };
      }

      case ActionType.ViewChanged: {
        return { ...state, view: new TimelineView(action.payload) };
      }

      case ActionType.Zoomed: {
        return {
          ...state,
          timeScale: rescaleTime(
            state.data,
            state.view,
            state.axisOrientations.time,
            action.payload
          )
        };
      }

      default: {
        return state;
      }
    }
  }
}
