import { Selector } from './selector';
import { MemoizedSelector } from './memoized-selector';

export function createSelector<S1Result, TResult>(
  selector1: Selector<S1Result>,
  projector: (res: S1Result) => TResult
): MemoizedSelector<TResult>;

export function createSelector<S1Result, S2Result, TResult>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  projector: (res1: S1Result, res2: S2Result) => TResult
): MemoizedSelector<TResult>;

export function createSelector<S1Result, S2Result, S3Result, TResult>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  selector3: Selector<S3Result>,
  projector: (res1: S1Result, res2: S2Result, res3: S3Result) => TResult
): MemoizedSelector<TResult>;

export function createSelector<S1Result, S2Result, S3Result, S4Result, TResult>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  selector3: Selector<S3Result>,
  selector4: Selector<S4Result>,
  projector: (
    res1: S1Result,
    res2: S2Result,
    res3: S3Result,
    res4: S4Result
  ) => TResult
): MemoizedSelector<TResult>;

export function createSelector<
  S1Result,
  S2Result,
  S3Result,
  S4Result,
  S5Result,
  TResult
>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  selector3: Selector<S3Result>,
  selector4: Selector<S4Result>,
  selector5: Selector<S4Result>,
  projector: (
    res1: S1Result,
    res2: S2Result,
    res3: S3Result,
    res4: S4Result,
    res5: S5Result
  ) => TResult
): MemoizedSelector<TResult>;

export function createSelector<
  S1Result,
  S2Result,
  S3Result,
  S4Result,
  S5Result,
  S6Result,
  TResult
>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  selector3: Selector<S3Result>,
  selector4: Selector<S4Result>,
  selector5: Selector<S5Result>,
  selector6: Selector<S6Result>,
  projector: (
    res1: S1Result,
    res2: S2Result,
    res3: S3Result,
    res4: S4Result,
    res5: S5Result,
    res6: S6Result
  ) => TResult
): MemoizedSelector<TResult>;

export function createSelector<
  S1Result,
  S2Result,
  S3Result,
  S4Result,
  S5Result,
  S6Result,
  S7Result,
  TResult
>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  selector3: Selector<S3Result>,
  selector4: Selector<S4Result>,
  selector5: Selector<S5Result>,
  selector6: Selector<S6Result>,
  selector7: Selector<S7Result>,
  projector: (
    res1: S1Result,
    res2: S2Result,
    res3: S3Result,
    res4: S4Result,
    res5: S5Result,
    res6: S6Result,
    res7: S7Result
  ) => TResult
): MemoizedSelector<TResult>;

export function createSelector<
  S1Result,
  S2Result,
  S3Result,
  S4Result,
  S5Result,
  S6Result,
  S7Result,
  S8Result,
  TResult
>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  selector3: Selector<S3Result>,
  selector4: Selector<S4Result>,
  selector5: Selector<S5Result>,
  selector6: Selector<S6Result>,
  selector7: Selector<S7Result>,
  selector8: Selector<S8Result>,
  projector: (
    res1: S1Result,
    res2: S2Result,
    res3: S3Result,
    res4: S4Result,
    res5: S5Result,
    res6: S6Result,
    res7: S7Result,
    res8: S8Result
  ) => TResult
): MemoizedSelector<TResult>;

export function createSelector<
  S1Result,
  S2Result,
  S3Result,
  S4Result,
  S5Result,
  S6Result,
  S7Result,
  S8Result,
  S9Result,
  TResult
>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  selector3: Selector<S3Result>,
  selector4: Selector<S4Result>,
  selector5: Selector<S5Result>,
  selector6: Selector<S6Result>,
  selector7: Selector<S7Result>,
  selector8: Selector<S8Result>,
  selector9: Selector<S9Result>,
  projector: (
    res1: S1Result,
    res2: S2Result,
    res3: S3Result,
    res4: S4Result,
    res5: S5Result,
    res6: S6Result,
    res7: S7Result,
    res8: S8Result,
    res9: S9Result
  ) => TResult
): MemoizedSelector<TResult>;

export function createSelector<
  S1Result,
  S2Result,
  S3Result,
  S4Result,
  S5Result,
  S6Result,
  S7Result,
  S8Result,
  S9Result,
  S10Result,
  TResult
>(
  selector1: Selector<S1Result>,
  selector2: Selector<S2Result>,
  selector3: Selector<S3Result>,
  selector4: Selector<S4Result>,
  selector5: Selector<S5Result>,
  selector6: Selector<S6Result>,
  selector7: Selector<S7Result>,
  selector8: Selector<S8Result>,
  selector9: Selector<S9Result>,
  selector10: Selector<S10Result>,
  projector: (
    res1: S1Result,
    res2: S2Result,
    res3: S3Result,
    res4: S4Result,
    res5: S5Result,
    res6: S6Result,
    res7: S7Result,
    res8: S8Result,
    res9: S9Result,
    res10: S10Result
  ) => TResult
): MemoizedSelector<TResult>;

export function createSelector(...args: any[]) {
  const projector = args.pop();
  const selectors = args;

  return new MemoizedSelector(selectors, projector);
}
