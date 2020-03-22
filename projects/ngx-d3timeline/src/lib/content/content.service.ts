import { Injectable } from '@angular/core';
import { Store } from '../store-lib/store';
import {
  selectNonDraggedActivityRectangles,
  selectDraggingActivityRectangle,
  selectDraggedFromRectangle,
  selectDraggedToRectangle
} from '../activity-rectangle/selectors/activity-rectangle.selectors';
import { selectViewClipRectangle } from '../view/view.selectors';
import { identifier } from '../core/types';
import {
  ActivityHoveredAction,
  ActivityUnhoveredAction
} from '../store/actions';
import { HoverType } from '../hover/hover-event';

@Injectable({ providedIn: 'root' })
export class ContentService {
  activityRectangles$ = this.store.select(selectNonDraggedActivityRectangles);
  draggingRectangle$ = this.store.select(selectDraggingActivityRectangle);
  dropRectangle$ = this.store.select(selectDraggedToRectangle);
  fromRectangle$ = this.store.select(selectDraggedFromRectangle);
  clipRect$ = this.store.select(selectViewClipRectangle);

  constructor(private store: Store) {}

  hovered(id: identifier) {
    this.store.dispatch(
      new ActivityHoveredAction({ id, type: HoverType.Hovered })
    );
  }

  unhovered(id: identifier) {
    this.store.dispatch(
      new ActivityUnhoveredAction({ id, type: HoverType.Unhovered })
    );
  }
}
