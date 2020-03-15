import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { Activity } from './activity';

import { Orientation } from './orientation';

import { NgxD3TimelineService } from './ngx-d3timeline.service';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg
      #svgEl
      *ngIf="timelineService.view$ | async as view"
      [attr.width]="view.width"
      [attr.height]="view.height"
      class="ngx-d3timeline"
    >
      <g ngx-d3timeline-resources-axis></g>
      <g ngx-d3timeline-time-axis></g>
      <g ngx-d3timeline-content></g>
    </svg>
  `,
  styleUrls: ['./ngx-d3timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxD3timelineComponent implements AfterViewInit {
  @Input() set activities(value: Activity[]) {
    this.timelineService.setActivities(value);
  }

  @Input() set view([width, height]: [number, number]) {
    this.timelineService.setView([width, height]);
  }

  @Input() set orientation(value: Orientation) {
    this.timelineService.setTimeOrientation(value);
  }

  @ViewChild('svgEl') svgEl: ElementRef<SVGElement>;

  constructor(public timelineService: NgxD3TimelineService) {}

  ngAfterViewInit(): void {
    this.timelineService.setupZoom(this.svgEl);
  }
}
