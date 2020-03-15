import { State } from '../store/state';
import { Selector } from './selector';
import { Projector } from './types';

export class MemoizedSelector<TResult> {
  lastArgs: any[] = null;
  lastResult: TResult;

  constructor(
    private inputSelectors: Selector<any>[],
    private projector: Projector<TResult>
  ) {}

  execute(state: State): TResult {
    const args = this.inputSelectors.map(selector => selector.execute(state));

    if (!this.argumentsSameAsLastTime(args)) {
      this.lastArgs = args;
      this.lastResult = this.projector(...args);
    }

    return this.lastResult;
  }

  private argumentsSameAsLastTime(next: any[]) {
    if (
      this.lastArgs === null ||
      next === null ||
      this.lastArgs.length !== next.length
    ) {
      return false;
    }

    // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
    const length = this.lastArgs.length;
    for (let i = 0; i < length; i++) {
      if (this.lastArgs[i] !== next[i]) {
        return false;
      }
    }

    return true;
  }
}
