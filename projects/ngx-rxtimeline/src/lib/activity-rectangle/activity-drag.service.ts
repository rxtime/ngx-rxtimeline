import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../store-lib/store';
import { withLatestFrom, filter, map } from 'rxjs/operators';
import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';

import * as fromActions from '../store/actions';
import { Identifier } from '../core/identifiable';
import { selectActivityUpdatedForDrag } from '../activity/activity.selectors';

@Injectable({ providedIn: 'root' })
export class ActivityDragService {
  private dragEndSubject = new BehaviorSubject(null);

  private activityUpdatedForDrag$ = this.dragEndSubject.pipe(
    filter(() => !!event),
    withLatestFrom(this.store.select(selectActivityUpdatedForDrag)),
    map(([, draggedToActivity]) => draggedToActivity)
  );

  constructor(private store: Store) {
    this.activityUpdatedForDrag$.subscribe(activityUpdatedForDrag => {
      this.store.dispatch(
        new fromActions.TimelineDragEndedAction(activityUpdatedForDrag)
      );
    });
  }

  setupDrag(id: Identifier, nativeElement: HTMLElement) {
    const onDrag = drag()
      .on('drag', () => this.onDragging(id))
      .on('end', this.onDragEnded.bind(this));

    onDrag(select(nativeElement));
  }

  private onDragging(id: Identifier) {
    this.store.dispatch(new fromActions.TimelineDraggingAction({ id, event }));
  }

  private onDragEnded() {
    this.dragEndSubject.next(null);
  }
}
