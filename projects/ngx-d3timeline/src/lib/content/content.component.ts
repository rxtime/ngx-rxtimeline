import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContentService } from './content.service';

@Component({
  selector: '[ngx-d3timeline-content]',
  template: `
    <svg:defs
      ngx-d3timeline-clip-path
      [clipRect]="contentService.clipRect$ | async"
    ></svg:defs>

    <svg:g clip-path="url(#clipRect)">
      <svg:g
        class="content-group"
        *ngIf="contentService.activityRectangles$ | async as activityRectangles"
      >
        <svg:g
          *ngFor="let activityRectangle of activityRectangles"
          ngx-d3timeline-activity-rectangle
          [activityRectangle]="activityRectangle"
          (mouseenter)="contentService.hovered(activityRectangle.id)"
          (mouseleave)="contentService.unhovered(activityRectangle.id)"
        ></svg:g>

        <svg:g
          *ngIf="contentService.fromRectangle$ | async as fromRectangle"
          ngx-d3timeline-activity-rectangle
          [activityRectangle]="fromRectangle"
          class="from-activity-rectangle"
        ></svg:g>

        <svg:g
          *ngIf="contentService.dropRectangle$ | async as dropRectangle"
          ngx-d3timeline-activity-rectangle
          [activityRectangle]="dropRectangle"
          class="drop-activity-rectangle"
        ></svg:g>

        <svg:g
          *ngIf="contentService.draggingRectangle$ | async as draggingRectangle"
          ngx-d3timeline-activity-rectangle
          [activityRectangle]="draggingRectangle"
        ></svg:g>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  constructor(public contentService: ContentService) {}
}
