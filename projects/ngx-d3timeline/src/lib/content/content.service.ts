import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { map } from 'rxjs/operators';
import * as dragSelectors from '../store/drag-selectors';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContentService {
  eventRectangles$ = this.store.select(
    dragSelectors.selectNonDragEventRectangles
  );

  dropRectangle$ = this.store.select(dragSelectors.selectDropTimelineRectangle);

  draggingRectangle$ = this.store.select(
    dragSelectors.selectDraggingTimelineRectangle
  );

  fromRectangle$ = this.store.select(dragSelectors.selectFromTimelineRectangle);

  constructor(private store: Store) {}
}
