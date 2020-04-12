export function bind1<TBoundArg, TUnboundArgs extends any[], TOut>(
  func: (boundArg: TBoundArg, ...unboundArgs: TUnboundArgs) => TOut,
  boundVal: TBoundArg
): (...unboundArgs: TUnboundArgs) => TOut {
  return (...unboundArgs: TUnboundArgs) => func(boundVal, ...unboundArgs);
}

export function bind2<TBoundArg1, TBoundArg2, TUnboundArgs extends any[], TOut>(
  func: (
    boundArg1: TBoundArg1,
    boundArg2: TBoundArg2,
    ...unboundArgs: TUnboundArgs
  ) => TOut,
  boundVal1: TBoundArg1,
  boundVal2: TBoundArg2
): (...unboundArgs: TUnboundArgs) => TOut {
  return (...unboundArgs: TUnboundArgs) =>
    func(boundVal1, boundVal2, ...unboundArgs);
}
