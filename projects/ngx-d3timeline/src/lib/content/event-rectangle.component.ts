import { Component, Input } from '@angular/core';
import { EventRectangle } from './content';

@Component({
  selector: '[ngx-d3timeline-event-rectangle]',
  template: `
    <svg:g [attr.transform]="eventRectangle.transform" *ngIf="eventRectangle">
      <svg:rect
        [attr.height]="eventRectangle.height"
        [attr.width]="eventRectangle.width"
      ></svg:rect>
      <svg:text dy="1em">{{ eventRectangle.title }}</svg:text>
    </svg:g>
  `,
  styles: [
    `
      rect {
        fill: #fff;
        stroke: #000;
      }

      text {
        font-size: 10px;
      }
    `
  ]
})
export class EventRectangleComponent {
  @Input() eventRectangle: EventRectangle;
}
