import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { ContentService } from './content.service';
import { Identifier } from '../core/identifiable';
import { ActivityRectangle } from '../activity-rectangle/activity-rectangle';

@Component({
  selector: '[ngx-rxtimeline-content]',
  template: `
    <svg:defs
      ngx-rxtimeline-clip-path
      [clipRect]="contentService.clipRect$ | async"
    ></svg:defs>

    <svg:g clip-path="url(#clipRect)">
      <svg:g
        class="content-group"
        *ngIf="contentService.activityRectangles$ | async as activityRectangles"
      >
        <svg:g
          *ngFor="
            let activityRectangle of activityRectangles;
            trackBy: trackByFn
          "
          ngx-rxtimeline-activity-rectangle
          [activityRectangle]="activityRectangle"
          (mouseenter)="hovered.emit(activityRectangle.id)"
          (mouseleave)="unhovered.emit(activityRectangle.id)"
          (click)="selected.emit(activityRectangle.id)"
        ></svg:g>

        <svg:g
          *ngIf="contentService.fromRectangle$ | async as fromRectangle"
          ngx-rxtimeline-activity-rectangle
          [activityRectangle]="fromRectangle"
          class="from-activity-rectangle"
        ></svg:g>

        <svg:g
          *ngIf="contentService.dropRectangle$ | async as dropRectangle"
          ngx-rxtimeline-activity-rectangle
          [activityRectangle]="dropRectangle"
          class="drop-activity-rectangle"
        ></svg:g>

        <svg:g
          *ngIf="contentService.draggingRectangle$ | async as draggingRectangle"
          ngx-rxtimeline-activity-rectangle
          [activityRectangle]="draggingRectangle"
        ></svg:g>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  @Output() hovered = new EventEmitter<Identifier>();
  @Output() unhovered = new EventEmitter<Identifier>();
  @Output() selected = new EventEmitter<Identifier>();

  constructor(public contentService: ContentService) {}

  trackByFn(activityRectangle: ActivityRectangle) {
    return activityRectangle.id;
  }
}
