import { Component } from '@angular/core';
import { TimeAxisService } from './time-axis.service';

@Component({
  selector: '[ngx-d3timeline-time-axis]',
  template: `
    <svg:g class="time-axis-group" *ngIf="timeAxisService.vm$ | async as vm">
      <svg:g
        *ngFor="let tickInfo of vm.tickInfos"
        [attr.transform]="tickInfo.transform"
      >
        <svg:text dx="-7">
          {{ tickInfo.label }}
        </svg:text>
        <svg:line x2="-5"></svg:line>
      </svg:g>
      <svg:line [attr.y2]="vm.axisLine.y2"></svg:line>
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
  constructor(public timeAxisService: TimeAxisService) {}
}
