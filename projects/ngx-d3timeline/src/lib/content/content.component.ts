import { Component, Input } from '@angular/core';
import { ContentViewModel } from './content-view-model';

@Component({
  selector: '[ngx-d3timeline-content]',
  template: `
    <svg:g class="content-group" *ngIf="vm">
      <svg:g
        *ngFor="let event of vm.data"
        [attr.transform]="vm.dataTransform(event)"
      >
        <svg:rect
          [attr.height]="vm.rectHeight(event)"
          [attr.width]="vm.rectWidth(event)"
        ></svg:rect>
        <svg:text dy="1em">{{ event.type }}</svg:text>
      </svg:g>
    </svg:g>
  `,
  styles: [
    `
      .content-group {
        font-size: 10px;
      }

      rect {
        fill: none;
        stroke: #000;
      }
    `
  ]
})
export class ContentComponent {
  @Input() vm: ContentViewModel;
}
