import { State } from '../../store/state';

export type Projector<TResult> = (...args: any[]) => TResult;
export type SliceProjector<TResult> = (state: State) => TResult;
