import { Component, Input } from '@angular/core';
import { ResourcesAxisViewModel } from './resources-axis-view-model';
import { AxisViewService } from '../scale/axis-view.service';

@Component({
  selector: '[ngx-d3timeline-resources-axis]',
  template: `
    <svg:g
      class="resources-axis-group"
      *ngIf="axisViewService.resourceAxisVm$ | async as vm"
    >
      <text
        *ngFor="let tickInfo of vm.tickInfos"
        [attr.transform]="tickInfo.transform"
        dy="-2"
      >
        {{ tickInfo.label }}
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
  constructor(public axisViewService: AxisViewService) {}
}
