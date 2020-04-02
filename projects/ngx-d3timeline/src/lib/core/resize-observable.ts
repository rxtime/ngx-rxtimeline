import { fromEventPattern } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

declare var ResizeObserver: any; // typings not yet available in Typescript
declare type ResizeObserver = any;

export function createResizeObservable(element: Element) {
  return fromEventPattern<[number, number]>(
    handler => addResizeHandler(handler, element),
    (handler, token) => removeResizeHandler(handler, token)
  );
}

function addResizeHandler(handler: NodeEventHandler, element: Element) {
  const resizeObserver = new ResizeObserver(entries => {
    const entry = entries[0];
    handler([entry.contentRect.width, entry.contentRect.height]);
  });
  resizeObserver.observe(element);
  return resizeObserver;
}

function removeResizeHandler(_: NodeEventHandler, token: ResizeObserver) {
  token.disconnect();
}
