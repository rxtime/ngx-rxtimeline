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
        <svg:g ngx-d3timeline-line [line]="tick.line"></svg:g>
      </svg:g>
      <svg:g ngx-d3timeline-line [line]="axis.line"></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeAxisComponent {
  constructor(public axisService: AxisService) {}
}
