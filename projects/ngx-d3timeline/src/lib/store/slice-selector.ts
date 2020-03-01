import { State } from '../store/state';

export class SliceSelector {
  constructor(private projector: (state: State) => any) {} //keyof State) {}

  execute(state: State) {
    return this.projector(state);
  }
}

export function createSliceSelector(projector: (state: State) => any) {
  // TODO keyof State) {
  return new SliceSelector(projector);
}
