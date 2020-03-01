import { State } from '../store/state';

export interface Selector {
  execute(state: State): any;
}
