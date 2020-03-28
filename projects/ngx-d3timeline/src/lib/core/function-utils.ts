export function partialApply<TInput, TBoundArgs extends any[], TOut>(
  func: (input: TInput, ...boundArgs: TBoundArgs) => TOut
): (...boundArgs: TBoundArgs) => (input: TInput) => TOut {
  return (...boundArgs: TBoundArgs) => (input: TInput) =>
    func.call(null, input, ...boundArgs);
}
