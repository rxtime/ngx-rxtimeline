import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { shareReplay, scan, map, switchMap } from 'rxjs/operators';
import { initialState } from './state';
import { Actions } from './actions';
import { ScaleService } from '../scale.service';
import { StateWithScales } from '../types';
import { ZoomService } from '../zoom.service';
import { reducer } from './reducer';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBufferSize = 100;
  private actionsSubject = new ReplaySubject<Actions>(this.replayBufferSize);

  private state$ = this.actionsSubject.pipe(
    scan(reducer, initialState),
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
    switchMap(stateWithScales => this.zoomService.rescale(stateWithScales))
  );

  constructor(
    private scaleService: ScaleService,
    private zoomService: ZoomService
  ) {}

  dispatch(action: Actions) {
    this.actionsSubject.next(action);
  }
}
