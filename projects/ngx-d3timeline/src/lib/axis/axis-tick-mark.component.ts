import { Component, Input } from '@angular/core';
import { TickMark } from './tick-mark';

@Component({
  selector: '[ngx-d3timeline-axis-tick-mark]',
  template: `
    <svg:g [attr.transform]="tickMark.transform">
      <svg:text
        [attr.dx]="tickMark.labelOffset.x"
        [attr.dy]="tickMark.labelOffset.y"
      >
        {{ tickMark.label }}
      </svg:text>
      <svg:g
        ngx-d3timeline-line
        *ngIf="tickMark.line"
        [line]="tickMark.line"
      ></svg:g>
    </svg:g>
  `
})
export class AxisTickMarkComponent {
  @Input() tickMark: TickMark;
}
