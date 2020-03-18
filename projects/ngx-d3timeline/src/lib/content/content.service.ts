import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import {
  selectNonDraggedActivityRectangles,
  selectDraggingActivityRectangle,
  selectDraggedFromRectangle,
  selectDraggedToRectangle
} from './selectors/activity-rectangle.selectors';

@Injectable({ providedIn: 'root' })
export class ContentService {
  activityRectangles$ = this.store.select(selectNonDraggedActivityRectangles);
  draggingRectangle$ = this.store.select(selectDraggingActivityRectangle);
  dropRectangle$ = this.store.select(selectDraggedToRectangle);
  fromRectangle$ = this.store.select(selectDraggedFromRectangle);

  constructor(private store: Store) {}
}
