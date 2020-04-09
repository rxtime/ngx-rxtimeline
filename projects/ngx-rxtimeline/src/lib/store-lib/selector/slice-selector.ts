import { State } from '../../store/state';
import { SliceProjector } from './types';

export class SliceSelector<TResult> {
  constructor(private projector: SliceProjector<TResult>) {}

  execute(state: State): TResult {
    return this.projector(state);
  }
}

export function createSliceSelector<TResult>(
  projector: SliceProjector<TResult>
) {
  return new SliceSelector(projector);
}
