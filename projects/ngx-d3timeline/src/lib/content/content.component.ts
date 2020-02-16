import { Component, Input } from '@angular/core';
import { ContentViewModel } from './content-view-model';

@Component({
  selector: '[ngx-d3timeline-content]',
  template: `
    <svg:g
        *ngFor="let event of vm.data"
        [attr.transform]="vm.dataTransform(event)"
    >
      <rect
        [attr.height]="vm.rectHeight(event)"
        [attr.width]="vm.bandwidth"
        fill="none"
        stroke="#000"
      ></rect>
      <text font-size="10px" dy="1em">{{ event.type }}</text>
    </svg:g>
  `
})
export class ContentComponent {
  @Input() vm: ContentViewModel;
}
