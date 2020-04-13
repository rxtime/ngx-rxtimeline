export function partial<T1, UnboundArgs extends any[], TOut>(
  func: (x1: T1, ...unboundArgs: UnboundArgs) => TOut,
  val1: T1
): (...unboundArgs: UnboundArgs) => TOut;

export function partial<T1, T2, UnboundArgs extends any[], TOut>(
  func: (x1: T1, x2: T2, ...unboundArgs: UnboundArgs) => TOut,
  val1: T1,
  val2: T2
): (...unboundArgs: UnboundArgs) => TOut;

export function partial(...args: any[]) {
  const func = args[0];
  const boundArgs = args.slice(1);

  return (...unboundArgs: any[]) => func(...boundArgs, ...unboundArgs);
}
