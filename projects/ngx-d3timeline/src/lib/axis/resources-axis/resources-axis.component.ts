import { Component } from '@angular/core';
import { AxisService } from '../axis.service';

@Component({
  selector: '[ngx-d3timeline-resources-axis]',
  template: `
    <svg:g
      class="resources-axis-group"
      *ngIf="axisService.resourceAxis$ | async as axis"
    >
      <text
        *ngFor="let tick of axis.ticks"
        [attr.transform]="tick.transform"
        dy="-2"
      >
        {{ tick.label }}
      </text>
      <svg:g ngx-d3timeline-axis-line [axisLine]="axis.axisLine"></svg:g>
    </svg:g>
  `,
  styles: [
    `
      .resources-axis-group {
        text-anchor: middle;
      }
      .resources-axis-line {
        stroke: #000;
      }
    `
  ]
})
export class ResourcesAxisComponent {
  constructor(public axisService: AxisService) {}
}
