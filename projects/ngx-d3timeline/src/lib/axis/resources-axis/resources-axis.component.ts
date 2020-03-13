import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AxisService } from '../axis.service';

@Component({
  selector: '[ngx-d3timeline-resources-axis]',
  template: `
    <svg:g
      class="resources-axis-group"
      *ngIf="axisService.resourceAxis$ | async as axis"
    >
      <svg:g *ngFor="let tick of axis.ticks" [attr.transform]="tick.transform">
        <text dy="-2">
          {{ tick.label }}
        </text>
        <svg:g ngx-d3timeline-line [line]="tick.line"></svg:g>
      </svg:g>
      <svg:g ngx-d3timeline-line [line]="axis.line"></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesAxisComponent {
  constructor(public axisService: AxisService) {}
}
