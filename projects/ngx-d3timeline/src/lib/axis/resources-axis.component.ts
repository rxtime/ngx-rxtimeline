import { Component, Input } from '@angular/core';
import { ResourcesAxisViewModel } from './resources-axis-view-model';

@Component({
  selector: '[ngx-d3timeline-resources-axis]',
  template: `
    <svg:g class="resources-axis-group" *ngIf="vm">
      <text
        *ngFor="let tickInfo of vm.tickInfos"
        [attr.transform]="tickInfo.transform"
        dy="-2"
      >
        {{ tickInfo.label }}
      </text>
      <svg:line
        class="resources-axis-line"
        [attr.x2]="vm.rangeLimit"
      ></svg:line>
    </svg:g>
  `,
  styles: [
    `
      .series-axis-group {
        text-anchor: middle;
      }
      .series-axis-line {
        stroke: #000;
      }
    `
  ]
})
export class ResourcesAxisComponent {
  @Input() vm: ResourcesAxisViewModel;
}
