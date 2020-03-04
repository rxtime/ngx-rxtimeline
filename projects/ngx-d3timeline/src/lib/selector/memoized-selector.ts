import { State } from '../store/state';
import { Selector } from './selector';
import { Projector } from './types';

export class MemoizedSelector<T> {
  lastArgs: any[];
  lastResult: any;

  constructor(
    private inputSelectors: Selector<T>[],
    private projector: Projector<T>
  ) {}

  execute(state: State) {
    const args =
      this.inputSelectors &&
      this.inputSelectors.map(selector => selector.execute(state));

    if (!this.argumentsSameAsLastTime(args)) {
      this.lastArgs = args;
      this.lastResult = this.projector(...args);
    }

    return this.lastResult;
  }

  private argumentsSameAsLastTime(args: any[]) {
    return (
      args && // TODO refine
      this.lastArgs &&
      args.length === this.lastArgs.length &&
      !args.find((arg, index) => arg !== this.lastArgs[index])
    );
  }
}

export function createSelector<T>(
  inputSelectors: Selector<T>[],
  projector: Projector<T>
): MemoizedSelector<T> {
  return new MemoizedSelector(inputSelectors, projector);
}
