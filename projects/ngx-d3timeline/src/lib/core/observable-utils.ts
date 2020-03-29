import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

export function outputOnObservableEmit<T>(
  observable$: Observable<T>,
  takeUntil$: Observable<any>,
  output: EventEmitter<T>
) {
  observable$
    .pipe(takeUntil(takeUntil$))
    .subscribe(value => output.emit(value));
}
