export function partialApply<TInput, TAppliedArgs extends any[], TOut>(
  func: (input: TInput, ...appliedArgs: TAppliedArgs) => TOut
): (...appliedArgs: TAppliedArgs) => (input: TInput) => TOut {
  return (...appliedArgs: TAppliedArgs) => (input: TInput) =>
    func(input, ...appliedArgs);
}

export function pipe<T>(
  ...args: ((...args: any[]) => T)[]
): (...t: any[]) => T {
  return x => args.reduce((acc, curr) => curr(acc), x);
}

export function clampZero(x: number) {
  return Math.max(x, 0);
}
