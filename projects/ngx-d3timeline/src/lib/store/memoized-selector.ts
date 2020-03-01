import { State } from '../store/state';
import { Selector } from './selector';

export class MemoizedSelector {
  lastArgs: any[];
  lastResult: any;

  constructor(
    private inputSelectors: Selector[],
    private projector: (...args: any[]) => any
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
  projector: (...args: any[]) => any
) {
  return new MemoizedSelector(inputSelectors, projector);
}
