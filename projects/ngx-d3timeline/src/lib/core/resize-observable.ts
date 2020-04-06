import { fromEventPattern } from 'rxjs';
import { View } from '../view/view';

declare var ResizeObserver: any; // typings not yet available in Typescript
declare type ResizeObserver = any;

export function createResizeObservable(element: Element) {
  let resizeObserver: ResizeObserver;

  return fromEventPattern<View>(addResizeHandler, removeResizeHandler);

  function addResizeHandler(handler: (view: View) => void) {
    resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      handler({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });
    resizeObserver.observe(element);
  }

  function removeResizeHandler() {
    resizeObserver.unobserve(element);
  }
}
