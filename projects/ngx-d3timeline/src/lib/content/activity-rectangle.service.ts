import { Injectable, ElementRef } from '@angular/core';
import { ActivityDragService } from './activity-drag.service';
import { ActivityRectangle } from './activity-rectangle';
import { Store } from '../store/store';
import { selectActivityFontSize } from '../options.selectors';

@Injectable({ providedIn: 'root' })
export class ActivityRectangleService {
  labelFontHeight = 10;
  labelPaddingEachSide = 1;
  minHeightToShowLabel = this.labelFontHeight + this.labelPaddingEachSide * 2;

  fontSize$ = this.store.select(selectActivityFontSize);

  constructor(private store: Store, private dragService: ActivityDragService) {}

  showLabel(activityRectangle: ActivityRectangle): boolean {
    return activityRectangle.height >= this.minHeightToShowLabel; // TODO consider orientation
  }

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
