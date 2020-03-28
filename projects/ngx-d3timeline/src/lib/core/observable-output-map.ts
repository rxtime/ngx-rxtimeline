import { Observable, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

export interface ObservableOutputMap<T> {
  observable$: Observable<T>;
  output: EventEmitter<T>;
}

export function setupObservableToOutputMappings(
  observableToOutputMap: ObservableOutputMap<any>[],
  destroy$: Subject<boolean>
) {
  observableToOutputMap.forEach(map =>
    setupObservableToOutputMapping(map, destroy$)
  );
}

function setupObservableToOutputMapping<T>(
  observableOutputMap: ObservableOutputMap<T>,
  destroy$: Subject<boolean>
) {
  const { observable$, output } = observableOutputMap;
  observable$.pipe(takeUntil(destroy$)).subscribe(value => output.emit(value));
}
