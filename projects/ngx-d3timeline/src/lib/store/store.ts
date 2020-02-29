import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ActionTypes } from './actions';
import { shareReplay, scan } from 'rxjs/operators';
import { initialState } from './state';
import { State } from './state';
import { TimelineView } from '../view/timeline-view';
import { Actions } from './actions';
import { ScaleService } from './scale.service';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBuffer = 100;
  private actionsSubject = new ReplaySubject<Actions>(this.replayBuffer);

  constructor(private scaleService: ScaleService) {}

  state$ = this.actionsSubject.pipe(
    scan(this.reducer.bind(this), initialState),
    shareReplay()
  );

  dispatch(action: Actions) {
    this.actionsSubject.next(action);
  }

  private reducer(state: State, action: Actions): State {
    switch (action.type) {
      case ActionTypes.DataChanged: {
        return this.recomputeStateAndScales(state, { data: action.payload });
      }

      case ActionTypes.OrientationChanged: {
        return this.recomputeStateAndScales(state, {
          axisOrientations: this.scaleService.setAxisOrientations(
            action.payload
          )
        });
      }

      case ActionTypes.ViewChanged: {
        return this.recomputeStateAndScales(state, {
          view: new TimelineView({
            width: action.payload[0],
            height: action.payload[1]
          })
        });
      }

      case ActionTypes.ZoomEvent: {
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

  private recomputeStateAndScales(state: State, bar: Partial<State>) {
    const stateCopy = { ...state, ...bar };
    return {
      ...stateCopy,
      timeScale: this.scaleService.configureTimeScale(stateCopy),
      bandScale: this.scaleService.configureBandScale(stateCopy)
    };
  }
}
