import { ElementRef } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

declare var ResizeObserver: any; // typings not yet available in Typescript
declare type ResizeObserver = any;

export function createResizeObservable(hostElement: ElementRef) {
  return fromEventPattern<[number, number]>(
    handler => addResizeHandler(handler, hostElement),
    (handler, token) => removeResizeHandler(handler, token)
  );
}

function addResizeHandler(handler: NodeEventHandler, hostElement: ElementRef) {
  const resizeObserver = new ResizeObserver(entries => {
    const entry = entries[0];
    handler([entry.contentRect.width, entry.contentRect.height]);
  });
  resizeObserver.observe(hostElement.nativeElement);
  return resizeObserver;
}

function removeResizeHandler(_: NodeEventHandler, token: ResizeObserver) {
  token.disconnect();
}
