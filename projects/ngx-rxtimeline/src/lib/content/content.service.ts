import { Injectable } from '@angular/core';
import { Store } from '../store-lib/store';
import {
  selectNonDraggedActivityRectangles,
  selectDraggingActivityRectangle,
  selectDraggedFromRectangle,
  selectDraggedToRectangle
} from '../activity-rectangle/selectors/activity-rectangle.selectors';
import { selectViewClipRect } from '../view/view.selectors';

@Injectable({ providedIn: 'root' })
export class ContentService {
  activityRectangles$ = this.store.select(selectNonDraggedActivityRectangles);
  draggingRectangle$ = this.store.select(selectDraggingActivityRectangle);
  dropRectangle$ = this.store.select(selectDraggedToRectangle);
  fromRectangle$ = this.store.select(selectDraggedFromRectangle);
  clipRect$ = this.store.select(selectViewClipRect);

  constructor(private store: Store) {}
}
