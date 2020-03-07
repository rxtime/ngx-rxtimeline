import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { map } from 'rxjs/operators';
import * as dragSelectors from '../store/drag-selectors';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContentService {
  eventRectangles$ = this.store.state$.pipe(
    map(state =>
      dragSelectors.selectNonDragEventRectangles
        .execute(state)
        .map(s => s.execute(state))
    )
  );

  dropRectangle$ = this.store.state$.pipe(
    map(state =>
      dragSelectors.selectDropTimelineRectangle.execute(state).execute(state)
    )
  );

  draggingRectangle$ = this.store.state$.pipe(
    map(state =>
      dragSelectors.selectDraggingTimelineRectangle
        .execute(state)
        .execute(state)
    )
  );

  fromRectangle$ = this.store.state$.pipe(
    map(state =>
      dragSelectors.selectFromTimelineRectangle.execute(state).execute(state)
    )
  );

  constructor(private store: Store) {}
}
