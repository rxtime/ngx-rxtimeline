import { State } from '../store/state';

export interface Selector<TResult> {
  execute(state: State): TResult;
}
