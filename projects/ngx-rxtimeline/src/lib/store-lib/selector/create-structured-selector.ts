import { MemoizedSelector } from './memoized-selector';

type Selectors<T> = { [P in keyof T]: MemoizedSelector<T[P]> };
export function createStructuredSelector<T>(
  selectors: Selectors<T>
): MemoizedSelector<T> {
  const objectKeys = Object.keys(selectors);

  return new MemoizedSelector(
    objectKeys.map(key => selectors[key]),
    (...values: any[]) => {
      return values.reduce((composition, value, index) => {
        composition[objectKeys[index]] = value;
        return composition;
      }, {});
    }
  );
}
