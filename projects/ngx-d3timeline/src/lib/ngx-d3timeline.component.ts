import { Component, Input } from '@angular/core';
import { TimelineEvent } from './timeline-event';
import { ViewService } from './view/view.service';
import { ScaleService } from './scale.service';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg
      [attr.width]="viewService.timelineView.width"
      [attr.height]="viewService.timelineView.height"
      class="ngx-d3timeline"
    >
      <g [attr.transform]="viewService.rootTransform">
        <g
          ngx-d3timeline-series-axis
          [vm]="scaleService.seriesAxisVm$ | async"
        ></g>
      </g>
    </svg>
  `,
  styles: []
})
export class NgxD3timelineComponent {
  @Input() set data(value: TimelineEvent[]) {
    this.scaleService.setData(value);
  }

  constructor(
    public viewService: ViewService,
    public scaleService: ScaleService
  ) {}
}
