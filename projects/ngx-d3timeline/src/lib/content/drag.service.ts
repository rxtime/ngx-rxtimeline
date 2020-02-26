import { Injectable } from '@angular/core';
import { DragEvent } from './drag-event';
import { scan, takeUntil, repeat } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventRectangle } from './content';

@Injectable({ providedIn: 'root' })
export class DragService {
  private dragSubject = new BehaviorSubject<DragEvent>(null);
  private dragEndSubject = new Subject<any>();

  drag$ = this.dragSubject.pipe(
    scan((acc, curr) => (curr ? { ...curr, dy: acc.dy + curr.dy } : acc), {
      dx: 0,
      dy: 0,
      id: null
    }),
    takeUntil(this.dragEndSubject),
    repeat()
  );

  onDrag(eventRectangle: EventRectangle, event: any) {
    this.dragSubject.next({
      id: eventRectangle.id,
      dx: event.dx,
      dy: event.dy
    });
  }

  onDragEnd() {
    this.dragEndSubject.next();
  }
}
