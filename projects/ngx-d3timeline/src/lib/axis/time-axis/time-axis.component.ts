import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AxisService } from '../axis.service';

@Component({
  selector: '[ngx-d3timeline-time-axis]',
  template: `
    <svg:g
      class="time-axis-group"
      *ngIf="axisService.timeAxis$ | async as axis"
    >
      <svg:g
        *ngFor="let tickMark of axis.tickMarks"
        [attr.transform]="tickMark.transform"
      >
        <svg:text
          [attr.dx]="tickMark.labelOffset.x"
          [attr.dy]="tickMark.labelOffset.y"
        >
          {{ tickMark.label }}
        </svg:text>
        <svg:g ngx-d3timeline-line [line]="tickMark.line"></svg:g>
      </svg:g>
      <svg:g ngx-d3timeline-line [line]="axis.line"></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeAxisComponent {
  constructor(public axisService: AxisService) {}
}
