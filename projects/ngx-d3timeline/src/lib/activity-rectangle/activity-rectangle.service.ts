import { Injectable, ElementRef } from '@angular/core';
import { ActivityDragService } from './activity-drag.service';
import { ActivityRectangle } from './activity-rectangle';

@Injectable({ providedIn: 'root' })
export class ActivityRectangleService {
  constructor(private dragService: ActivityDragService) {}

  setupDrag(
    activityRectangle: ActivityRectangle,
    activityRectangleEl: ElementRef
  ) {
    if (
      activityRectangleEl &&
      activityRectangle &&
      !activityRectangle.disableDrag
    ) {
      this.dragService.setupDrag(
        activityRectangle.id,
        activityRectangleEl.nativeElement
      );
    }
  }
}
