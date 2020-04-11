import { MemoizedSelector } from './memoized-selector';
import { Selector } from './selector';

const projectToObject = (objectKeys: string[], values: any[]) =>
  values.reduce((composition, value, index) => {
    composition[objectKeys[index]] = value;
    return composition;
  }, {});

type Selectors<T> = { [P in keyof T]: MemoizedSelector<T[P]> };
export function createStructuredSelector<T>(
  selectors: Selectors<T>
): MemoizedSelector<T> {
  const objectKeys = Object.keys(selectors);

  return new MemoizedSelector(
    objectKeys.map(key => selectors[key]),
    (...values: any[]) => projectToObject(objectKeys, values)
  );
}

type EnumSelectors<TEnum extends string | number, TResult> = {
  [key in TEnum]: Selector<TResult>;
};
export function createEnumSelector<TEnum extends string | number, TResult>(
  selectors: EnumSelectors<TEnum, TResult>
): (x: Selector<TEnum>) => MemoizedSelector<TResult> {
  const objectKeys = Object.keys(selectors);

  return (selectEnumVal: Selector<TEnum>) =>
    new MemoizedSelector(
      [selectEnumVal, ...objectKeys.map(key => selectors[key])],
      (enumVal, ...values: any[]) =>
        projectToObject(objectKeys, values)[enumVal]
    );
}
