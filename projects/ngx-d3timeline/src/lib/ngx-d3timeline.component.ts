import { Component, Input } from '@angular/core';
import { TimelineEvent } from './timeline-event';
import { ViewService } from './view/view.service';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg
      [attr.width]="viewService.view.width"
      [attr.height]="viewService.view.height"
      class="ngx-d3timeline"
    >
      <g class="root-group" [attr.transform]="viewService.rootTransform"></g>
    </svg>
  `,
  styles: []
})
export class NgxD3timelineComponent {
  @Input() data: TimelineEvent[];

  constructor(public viewService: ViewService) {}
}
