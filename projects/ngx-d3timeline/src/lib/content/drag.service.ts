import { Injectable } from '@angular/core';
import { EventRectangleDragEvent } from './event-rectangle-drag-event';
import { scan, takeUntil, repeat } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventRectangle } from './content';

@Injectable({ providedIn: 'root' })
export class DragService {
  private dragSubject = new BehaviorSubject<EventRectangleDragEvent>(null);
  private dragEndSubject = new Subject<any>();

  private readonly dragSeed = {
    dx: 0,
    dy: 0,
    id: null
  };

  drag$ = this.dragSubject.pipe(
    scan(
      (acc, curr): EventRectangleDragEvent =>
        curr ? { ...curr, dy: acc.dy + curr.dy, dx: acc.dx + curr.dx } : acc,
      this.dragSeed
    ),
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
