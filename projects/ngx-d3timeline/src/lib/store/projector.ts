import { State } from '../store/state';

export type Projector = (...args: any[]) => any;
export type SliceProjector = <TSlice extends keyof State>(
  state: State
) => State[TSlice];
