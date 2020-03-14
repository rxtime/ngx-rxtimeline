import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AxisService } from '../axis.service';

@Component({
  selector: '[ngx-d3timeline-resources-axis]',
  template: `
    <svg:g
      class="resources-axis-group"
      *ngIf="axisService.resourceAxis$ | async as axis"
    >
      <svg:g
        *ngFor="let tickMark of axis.tickMarks"
        ngx-d3timeline-axis-tick-mark
        [tickMark]="tickMark"
      ></svg:g>
      <svg:g ngx-d3timeline-line [line]="axis.line"></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesAxisComponent {
  constructor(public axisService: AxisService) {}
}
