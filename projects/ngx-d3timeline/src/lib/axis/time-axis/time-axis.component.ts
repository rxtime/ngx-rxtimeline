import { Component } from '@angular/core';
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
        <svg:line x2="-5"></svg:line>
      </svg:g>
      <svg:line
        [attr.x2]="axis.axisLine.x2"
        [attr.y2]="axis.axisLine.y2"
      ></svg:line>
    </svg:g>
  `,
  styles: [
    `
      .time-axis-group {
        text-anchor: end;
        dominant-baseline: central;
        font-size: 10px;
      }

      line {
        stroke: #000;
      }
    `
  ]
})
export class TimeAxisComponent {
  constructor(public axisService: AxisService) {}
}
