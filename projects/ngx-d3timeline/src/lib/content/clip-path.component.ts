import { Component, Input } from '@angular/core';
import { Rectangle } from '../rectangle';

@Component({
  selector: '[ngx-d3timeline-clip-path]',
  template: `
    <svg:clipPath id="clipRect">
      <svg:rect
        [attr.x]="clipRect.x"
        [attr.y]="clipRect.y"
        [attr.width]="clipRect.width"
        [attr.height]="clipRect.height"
      ></svg:rect>
    </svg:clipPath>
  `
})
export class ClipPathComponent {
  @Input() clipRect: Rectangle;
}
