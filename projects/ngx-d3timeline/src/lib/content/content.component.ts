import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContentService } from './content.service';

@Component({
  selector: '[ngx-d3timeline-content]',
  template: `
    <svg:g
      class="content-group"
      *ngIf="contentService.eventRectangles$ | async as eventRectangles"
    >
      <svg:g
        *ngFor="let eventRectangle of eventRectangles"
        ngx-d3timeline-event-rectangle
        [eventRectangle]="eventRectangle"
      ></svg:g>

      <svg:g
        *ngIf="contentService.dropRectangle$ | async as dropRectangle"
        ngx-d3timeline-event-rectangle
        [eventRectangle]="dropRectangle"
      ></svg:g>

      <svg:g
        *ngIf="contentService.draggingRectangle$ | async as draggingRectangle"
        ngx-d3timeline-event-rectangle
        [eventRectangle]="draggingRectangle"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  constructor(public contentService: ContentService) {}
}
