import { Component, Input } from '@angular/core';
import { TimelineEvent } from './timeline-event';
import { ViewService } from './view/view.service';
import { AxisService } from './axis.service';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg
      *ngIf="viewService.view$ | async as view"
      [attr.width]="view.width"
      [attr.height]="view.height"
      class="ngx-d3timeline"
    >
      <g [attr.transform]="viewService.rootTransform">
        <g
          ngx-d3timeline-resources-axis
          [vm]="axisService.resourcesAxisVm$ | async"
        ></g>
        <g ngx-d3timeline-time-axis [vm]="axisService.timeAxisVm$ | async"></g>
      </g>
    </svg>
  `,
  styles: []
})
export class NgxD3timelineComponent {
  @Input() set data(value: TimelineEvent[]) {
    this.axisService.setData(value);
  }

  @Input() set view([width, height]: [number, number]) {
    this.viewService.setView([width, height]);
  }

  constructor(
    public viewService: ViewService,
    public axisService: AxisService
  ) {}
}
