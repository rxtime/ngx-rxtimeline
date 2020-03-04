import { State } from '../store/state';

export interface Selector<T> {
  execute(state: State): T;
}
