import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ActionType } from './actions';
import { shareReplay, scan, map } from 'rxjs/operators';
import { initialState } from './state';
import { State } from './state';
import { TimelineView } from '../view/timeline-view';
import { Actions } from './actions';
import { ScaleService } from '../scale.service';
import { OptionsService } from '../options.service';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBufferSize = 100;
  private actionsSubject = new ReplaySubject<Actions>(this.replayBufferSize);

  constructor(
    private scaleService: ScaleService,
    private optionsService: OptionsService
  ) {}

  state$ = this.actionsSubject.pipe(
    scan(this.reducer.bind(this), initialState),
    shareReplay()
  );

  dispatch(action: Actions) {
    this.actionsSubject.next(action);
  }

  select(selector: (state: State) => any) {
    return this.state$.pipe(map(state => selector(state)));
  }

  private reducer(state: State, action: Actions): State {
    switch (action.type) {
      case ActionType.DataChanged: {
        return this.patchStateAndUpdateScales(state, { data: action.payload });
      }

      case ActionType.OrientationChanged: {
        return this.patchStateAndUpdateScales(state, {
          axisOrientations: this.optionsService.setAxisOrientations(
            action.payload
          )
        });
      }

      case ActionType.ViewChanged: {
        return this.patchStateAndUpdateScales(state, {
          view: new TimelineView(action.payload)
        });
      }

      case ActionType.Zoomed: {
        return {
          ...state,
          timeScale: this.scaleService.rescaleTime(state, action.payload)
        };
      }

      default: {
        return state;
      }
    }
  }

  private patchStateAndUpdateScales(state: State, patch: Partial<State>) {
    const patchedState = { ...state, ...patch };
    return {
      ...patchedState,
      timeScale: this.scaleService.configureTimeScale(patchedState),
      bandScale: this.scaleService.configureBandScale(patchedState)
    };
  }
}
