import { Component } from '@angular/core';
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
        *ngIf="contentService.previewRectangle$ | async as previewRectangle"
        ngx-d3timeline-event-rectangle
        [eventRectangle]="previewRectangle"
      ></svg:g>

      <svg:g
        *ngIf="contentService.dragEventRectangle$ | async as dragEventRectangle"
        ngx-d3timeline-event-rectangle
        [eventRectangle]="dragEventRectangle"
      ></svg:g>
    </svg:g>
  `
})
export class ContentComponent {
  constructor(public contentService: ContentService) {}
}
