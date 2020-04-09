export function mapValues<TIn, TOut>(
  values: TIn[],
  projector: (value: TIn) => TOut
): TOut[] {
  return values.map(projector);
}
