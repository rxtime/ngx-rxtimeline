import { State } from '../../store/state';
import { MemoizedSelector } from './memoized-selector';
import { identity } from 'rxjs';

export interface Selector<TResult> {
  execute(state: State): TResult;
}

export function constSelector<T>(value: T): MemoizedSelector<T> {
  return new MemoizedSelector<T>([{ execute: () => value }], identity);
}
