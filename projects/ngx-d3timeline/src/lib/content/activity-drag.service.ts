import { Injectable } from '@angular/core';
import { tempStateSelector } from '../store/timeline-selectors';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../store/store';
import { withLatestFrom, filter } from 'rxjs/operators';
import { getDropActivity } from '../drag-utils';
import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';

import * as fromActions from '../store/actions';
import { ActivityRectangle } from './activity-rectangle';
import { identifier } from '../types';

@Injectable({ providedIn: 'root' })
export class ActivityDragService {
  private dragEndSubject = new BehaviorSubject(null);

  drop$ = this.dragEndSubject.pipe(
    filter(() => !!event),
    withLatestFrom(this.store.select(tempStateSelector))
  );

  constructor(private store: Store) {
    this.drop$.subscribe(([, tempState]) => {
      const dropActivity = getDropActivity(
        tempState.bandScale,
        tempState.timeScale,
        tempState.activities,
        tempState.dragEvent,
        tempState.timeOrientation
      );

      this.store.dispatch(
        new fromActions.TimelineDragEndedAction(dropActivity)
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
