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
        [attr.transform]="eventRectangle.transform"
      >
        <svg:rect
          [attr.height]="eventRectangle.height"
          [attr.width]="eventRectangle.width"
        ></svg:rect>
        <svg:text dy="1em">{{ eventRectangle.title }}</svg:text>
      </svg:g>
    </svg:g>
  `,
  styles: [
    `
      .content-group {
        font-size: 10px;
      }

      rect {
        fill: none;
        stroke: #000;
      }
    `
  ]
})
export class ContentComponent {
  constructor(public contentService: ContentService) {}
}
