export type identifier = string | number;

export type Complete<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[]
    ? Complete<U>[]
    : T[P] extends object
    ? Complete<T[P]>
    : T[P];
};
