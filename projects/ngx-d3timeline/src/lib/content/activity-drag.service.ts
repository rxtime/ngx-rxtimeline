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

  setupDrag(activityRectangle: ActivityRectangle, nativeElement: HTMLElement) {
    const onDrag = drag()
      .on('start', () => this.onDragStarted(activityRectangle))
      .on('drag', () => this.onDragging(activityRectangle))
      .on('end', this.onDragEnded.bind(this));

    onDrag(select(nativeElement));
  }

  private onDragStarted(activityRectangle: ActivityRectangle) {
    this.store.dispatch(
      new fromActions.TimelineDragStartedAction({
        id: activityRectangle.id,
        event
      })
    );
  }

  private onDragging(activityRectangle: ActivityRectangle) {
    this.store.dispatch(new fromActions.TimelineDraggingAction(event));
  }

  private onDragEnded() {
    this.dragEndSubject.next(null);
  }
}
