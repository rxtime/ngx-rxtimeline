import { Component, ChangeDetectionStrategy } from '@angular/core';
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
      <svg:g ngx-d3timeline-line [line]="axis.axisLine"></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesAxisComponent {
  constructor(public axisService: AxisService) {}
}
