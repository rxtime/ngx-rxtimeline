import { Injectable } from '@angular/core';
import { TimelineDragEvent } from './timeline-drag-event';
import { scan, takeUntil, repeat } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventRectangle } from './content';

@Injectable({ providedIn: 'root' })
export class DragService {
  private dragSubject = new BehaviorSubject<TimelineDragEvent>(null);
  private dragEndSubject = new Subject<any>();

  private readonly dragSeed: TimelineDragEvent = {
    dx: 0,
    dy: 0,
    id: null
  };

  drag$ = this.dragSubject.pipe(
    scan(
      (acc, curr): TimelineDragEvent =>
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
