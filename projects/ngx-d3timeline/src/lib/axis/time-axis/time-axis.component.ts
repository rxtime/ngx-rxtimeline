import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AxisService } from '../axis.service';

@Component({
  selector: '[ngx-d3timeline-time-axis]',
  template: `
    <svg:g
      class="time-axis-group"
      *ngIf="axisService.timeAxis$ | async as axis"
    >
      <svg:g *ngFor="let tick of axis.ticks" [attr.transform]="tick.transform">
        <svg:text dx="-7">
          {{ tick.label }}
        </svg:text>
        <svg:line
          class="tick-line"
          [attr.x2]="tick.lineEnd.x"
          [attr.y2]="tick.lineEnd.y"
        ></svg:line>
      </svg:g>
      <svg:g ngx-d3timeline-axis-line [axisLine]="axis.axisLine"></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeAxisComponent {
  constructor(public axisService: AxisService) {}
}
