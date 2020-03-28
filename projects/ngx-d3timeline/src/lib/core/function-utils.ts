export function partialApply<TInput, TAppliedArgs extends any[], TOut>(
  func: (input: TInput, ...appliedArgs: TAppliedArgs) => TOut
): (...appliedArgs: TAppliedArgs) => (input: TInput) => TOut {
  return (...appliedArgs: TAppliedArgs) => (input: TInput) =>
    func.call(null, input, ...appliedArgs);
}
