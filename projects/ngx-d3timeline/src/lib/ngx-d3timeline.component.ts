import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { TimelineEvent } from './timeline-event';
import { ViewService } from './view/view.service';
import { AxisService } from './axis.service';
import { zoom } from 'd3-zoom';
import { select, event } from 'd3-selection';
import { EventService } from './event.service';
import { Orientation } from './orientation';
import { OptionsService } from './options.service';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg
      #svgEl
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
export class NgxD3timelineComponent implements AfterViewInit {
  @Input() set data(value: TimelineEvent[]) {
    this.axisService.setData(value);
  }

  @Input() set view([width, height]: [number, number]) {
    this.viewService.setView([width, height]);
  }

  @Input() set orientation(value: Orientation) {
    this.optionsService.setOrientation(value);
  }

  @ViewChild('svgEl') svgEl: ElementRef;

  constructor(
    public viewService: ViewService,
    public axisService: AxisService,
    private eventService: EventService,
    private optionsService: OptionsService
  ) {}

  ngAfterViewInit(): void {
    if (this.svgEl) {
      const onZoom = zoom().on('zoom', () => this.eventService.onEvent(event));
      onZoom(select(this.svgEl.nativeElement));
    }
  }
}
