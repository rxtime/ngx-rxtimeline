import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { shareReplay, scan } from 'rxjs/operators';
import { initialState } from './state';
import { Actions } from './actions';
import { reducer } from './reducer';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBufferSize = 100;
  private actionsSubject = new ReplaySubject<Actions>(this.replayBufferSize);

  state$ = this.actionsSubject.pipe(scan(reducer, initialState), shareReplay());

  dispatch(action: Actions) {
    this.actionsSubject.next(action);
  }
}
