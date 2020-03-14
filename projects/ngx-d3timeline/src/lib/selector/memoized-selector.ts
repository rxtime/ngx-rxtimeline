import { State } from '../store/state';
import { Selector } from './selector';
import { Projector } from './types';

export class MemoizedSelector<TResult> {
  lastArgs: any[];
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

  private argumentsSameAsLastTime(args: any[]) {
    return (
      args && // TODO refine
      this.lastArgs &&
      args.length === this.lastArgs.length &&
      !args.find((arg, index) => arg !== this.lastArgs[index])
    );
  }
}
