import { Component } from '@angular/core';
import { ResourcesAxisService } from './resources-axis.service';

@Component({
  selector: '[ngx-d3timeline-resources-axis]',
  template: `
    <svg:g
      class="resources-axis-group"
      *ngIf="resourcesAxisService.vm$ | async as vm"
    >
      <text
        *ngFor="let tick of vm.ticks"
        [attr.transform]="tick.transform"
        dy="-2"
      >
        {{ tick.label }}
      </text>
      <svg:line
        class="resources-axis-line"
        [attr.x2]="vm.axisLine.x2"
        [attr.y2]="vm.axisLine.y2"
      ></svg:line>
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
  constructor(public resourcesAxisService: ResourcesAxisService) {}
}
