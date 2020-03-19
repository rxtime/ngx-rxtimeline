import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../store/store';
import { withLatestFrom, filter, map } from 'rxjs/operators';
import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';

import * as fromActions from '../store/actions';
import { identifier } from '../types';
import { selectDraggedToActivity } from './selectors/activity.selectors';

@Injectable({ providedIn: 'root' })
export class ActivityDragService {
  private dragEndSubject = new BehaviorSubject(null);

  private draggedToActivity$ = this.dragEndSubject.pipe(
    filter(() => !!event),
    withLatestFrom(this.store.select(selectDraggedToActivity)),
    map(([, draggedToActivity]) => draggedToActivity)
  );

  constructor(private store: Store) {
    this.draggedToActivity$.subscribe(draggedToActivity => {
      this.store.dispatch(
        new fromActions.TimelineDragEndedAction(draggedToActivity)
      );
    });
  }

  setupDrag(activityRectangleId: identifier, nativeElement: HTMLElement) {
    const onDrag = drag()
      .on('start', () => this.onDragStarted(activityRectangleId))
      .on('drag', this.onDragging.bind(this))
      .on('end', this.onDragEnded.bind(this));

    onDrag(select(nativeElement));
  }

  private onDragStarted(activityRectangleId: identifier) {
    this.store.dispatch(
      new fromActions.TimelineDragStartedAction({
        id: activityRectangleId,
        event
      })
    );
  }

  private onDragging() {
    this.store.dispatch(new fromActions.TimelineDraggingAction(event));
  }

  private onDragEnded() {
    this.dragEndSubject.next(null);
  }
}
