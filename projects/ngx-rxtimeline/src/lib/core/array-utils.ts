import { add } from './function-utils';

export function sum(...args: number[]) {
  return args.reduce(add);
}

export function toArray<T>(...args: T[]): T[] {
  return args;
}
