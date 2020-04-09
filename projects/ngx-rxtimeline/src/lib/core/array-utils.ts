export function sum(...args: number[]) {
  return args.reduce((a, b) => a + b);
}

export function toArray(...args: any[]): any[] {
  return args;
}
