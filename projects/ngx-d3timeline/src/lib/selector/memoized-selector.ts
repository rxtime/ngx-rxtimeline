import { State } from '../store/state';
import { Selector } from './selector';
import { Projector } from './types';

export class MemoizedSelector {
  lastArgs: any[];
  lastResult: any;

  constructor(
    private inputSelectors: Selector[],
    private projector: Projector
  ) {}

  execute(state: State) {
    const args = this.inputSelectors.map(selector => selector.execute(state));

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

export function createSelector(
  inputSelectors: Selector[],
  projector: Projector
) {
  return new MemoizedSelector(inputSelectors, projector);
}
