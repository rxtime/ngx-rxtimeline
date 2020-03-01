import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { ActionType } from './actions';
import { shareReplay, scan, map, switchMap } from 'rxjs/operators';
import { initialState } from './state';
import { State } from './state';
import { TimelineView } from '../view/timeline-view';
import { Actions } from './actions';
import { ScaleService } from '../scale.service';
import { OptionsService } from '../options.service';
import { StateWithScales } from '../scale-types';
import { ZoomService } from '../zoom.service';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBufferSize = 100;
  private actionsSubject = new ReplaySubject<Actions>(this.replayBufferSize);

  private state$ = this.actionsSubject.pipe(
    scan(this.reducer.bind(this), initialState),
    shareReplay()
  );

  stateWithScales$: Observable<
    { [K in keyof StateWithScales]: StateWithScales[K] }
  > = this.state$.pipe(
    map(state => ({
      ...state,
      bandScale: this.scaleService.configureBandScale(state),
      timeScale: this.scaleService.configureTimeScale(state)
    })),
    switchMap(stateWithScales =>
      this.zoomService.zoom$.pipe(
        map(zoomEvent =>
          zoomEvent
            ? {
                ...stateWithScales,
                timeScale: this.scaleService.rescaleTime(
                  stateWithScales,
                  zoomEvent
                )
              }
            : stateWithScales
        )
      )
    )
  );

  constructor(
    private scaleService: ScaleService,
    private optionsService: OptionsService,
    private zoomService: ZoomService
  ) {}

  dispatch(action: Actions) {
    this.actionsSubject.next(action);
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

      default: {
        return state;
      }
    }
  }
}
