import { Injectable, ElementRef } from '@angular/core';
import { ActivityDragService } from './activity-drag.service';
import { ActivityRectangle } from './activity-rectangle';
import { Store } from '../store/store';
import { selectActivityFontSize } from '../options.selectors';

@Injectable({ providedIn: 'root' })
export class ActivityRectangleService {
  fontSize$ = this.store.select(selectActivityFontSize);

  constructor(private store: Store, private dragService: ActivityDragService) {}

  setupDrag(
    activityRectangle: ActivityRectangle,
    activityRectangleEl: ElementRef
  ) {
    if (activityRectangleEl) {
      this.dragService.setupDrag(
        activityRectangle.id,
        activityRectangleEl.nativeElement
      );
    }
  }
}
