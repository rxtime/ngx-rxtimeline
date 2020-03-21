import { Injectable } from '@angular/core';
import { Store } from '../store-lib/store';
import {
  selectNonDraggedActivityRectangles,
  selectDraggingActivityRectangle,
  selectDraggedFromRectangle,
  selectDraggedToRectangle
} from './selectors/activity-rectangle.selectors';
import { selectViewClipRectangle } from '../view/view.selectors';

@Injectable({ providedIn: 'root' })
export class ContentService {
  activityRectangles$ = this.store.select(selectNonDraggedActivityRectangles);
  draggingRectangle$ = this.store.select(selectDraggingActivityRectangle);
  dropRectangle$ = this.store.select(selectDraggedToRectangle);
  fromRectangle$ = this.store.select(selectDraggedFromRectangle);
  clipRect$ = this.store.select(selectViewClipRectangle);

  constructor(private store: Store) {}
}
