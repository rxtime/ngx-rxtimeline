import { State } from '../store/state';

export type Projector<T> = (...args: any[]) => T;
export type SliceProjector = <TSlice extends keyof State>(
  state: State
) => State[TSlice];
