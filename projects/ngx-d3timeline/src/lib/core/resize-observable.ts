import { fromEventPattern } from 'rxjs';

declare var ResizeObserver: any; // typings not yet available in Typescript
declare type ResizeObserver = any;

export function createResizeObservable(element: Element) {
  let resizeObserver: ResizeObserver;

  return fromEventPattern<[number, number]>(
    addResizeHandler,
    removeResizeHandler
  );

  function addResizeHandler(
    handler: ([width, height]: [number, number]) => void
  ) {
    resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      handler([entry.contentRect.width, entry.contentRect.height]);
    });
    resizeObserver.observe(element);
  }

  function removeResizeHandler() {
    resizeObserver.unobserve(element);
  }
}
