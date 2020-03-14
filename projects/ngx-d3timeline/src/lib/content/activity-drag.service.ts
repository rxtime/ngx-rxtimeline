import { Injectable } from '@angular/core';
import { tempStateSelector } from '../store/timeline-selectors';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../store/store';
import { withLatestFrom } from 'rxjs/operators';
import { getDropActivity } from '../drag-utils';
import { TimelineDragEndedAction } from '../store/actions';

@Injectable({ providedIn: 'root' })
export class ActivityDragService {
  private dragEndSubject = new BehaviorSubject(null);

  drop$ = this.dragEndSubject.pipe(
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

      if (dropActivity) {
        this.store.dispatch(new TimelineDragEndedAction(dropActivity));
      }
    });
  }

  onDragEnd() {
    this.dragEndSubject.next(null);
  }
}
