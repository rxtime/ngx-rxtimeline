import { Component, Input } from '@angular/core';
import { SeriesAxisViewModel } from './serie-axis-view-model';

@Component({
  selector: '[ngx-d3timeline-series-axis]',
  template: `
    <svg:g class="series-axis-group">
      <text
        *ngFor="let tickInfo of vm?.tickInfos"
        [attr.transform]="tickInfo.transform"
        dy="-2"
      >
        {{ tickInfo.label }}
      </text>
      <svg:line class="series-axis-line" [attr.x2]="vm?.rangeLimit"></svg:line>
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
export class SeriesAxisComponent {
  @Input() vm: SeriesAxisViewModel;
}
