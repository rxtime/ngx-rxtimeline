import { State } from '../store/state';
import { SliceProjector } from './projector';

export class SliceSelector {
  constructor(private projector: SliceProjector) {}

  execute(state: State) {
    return this.projector(state);
  }
}

export function createSliceSelector(projector: SliceProjector) {
  return new SliceSelector(projector);
}
