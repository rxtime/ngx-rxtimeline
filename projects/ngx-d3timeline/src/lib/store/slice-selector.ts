import { State } from '../store/state';
import { Projector } from './projector';

export class SliceSelector {
  constructor(private projector: Projector) {} //keyof State) {}

  execute(state: State) {
    return this.projector(state);
  }
}

export function createSliceSelector(projector: Projector) {
  // TODO keyof State) {
  return new SliceSelector(projector);
}
