import { State } from '../../store/state';

export interface Selector<TResult> {
  execute(state: State): TResult;
}

export function constSelector<T>(value: T): Selector<T> {
  return {
    execute: () => value
  };
}
