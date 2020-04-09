import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { shareReplay, scan, map } from 'rxjs/operators';
import { Action } from './action';
import { reducer } from '../store/reducer';
import { Selector } from './selector/selector';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBufferSize = 100;
  private actionsSubject = new ReplaySubject<Action>(this.replayBufferSize);

  state$ = this.actionsSubject.pipe(scan(reducer, undefined), shareReplay());

  dispatch(action: Action): void {
    this.actionsSubject.next(action);
  }

  select<TResult>(selector: Selector<TResult>): Observable<TResult> {
    return this.state$.pipe(map(state => selector.execute(state)));
  }
}
