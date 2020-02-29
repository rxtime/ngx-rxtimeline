import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ActionType } from './actions';
import { shareReplay, scan } from 'rxjs/operators';
import { initialState } from './state';
import { State } from './state';
import { TimelineView } from '../view/timeline-view';
import { Actions } from './actions';
import { ScaleService } from '../scale.service';
import { OptionsService } from '../options.service';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBuffer = 100;
  private actionsSubject = new ReplaySubject<Actions>(this.replayBuffer);

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
    const stateCopy = { ...state, ...patch };
    return {
      ...stateCopy,
      timeScale: this.scaleService.configureTimeScale(stateCopy),
      bandScale: this.scaleService.configureBandScale(stateCopy)
    };
  }
}
