import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Activity } from './activity';

import { Orientation } from './orientation';

import { NgxD3TimelineService } from './ngx-d3timeline.service';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg
      #svgEl
      *ngIf="timeline.view$ | async as view"
      [attr.width]="view.width"
      [attr.height]="view.height"
      class="ngx-d3timeline"
    >
      <g
        ngx-d3timeline-axis
        class="resources-axis"
        [axis]="timeline.resourceAxis$ | async"
      ></g>
      <g
        ngx-d3timeline-axis
        class="time-axis"
        [axis]="timeline.timeAxis$ | async"
      ></g>
      <g ngx-d3timeline-content></g>
    </svg>
  `,
  styleUrls: ['./ngx-d3timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxD3timelineComponent implements OnInit, AfterViewInit {
  @Input() set activities(value: Activity[]) {
    this.timeline.setActivities(value);
  }

  @Input() set view([width, height]: [number, number]) {
    this.timeline.setView([width, height]);
  }

  @Input() set orientation(value: Orientation) {
    this.timeline.setTimeOrientation(value);
  }

  @Output() activityDropped = new EventEmitter<Activity>();

  @ViewChild('svgEl') svgEl: ElementRef<SVGElement>;

  constructor(public timeline: NgxD3TimelineService) {}

  ngOnInit(): void {
    this.timeline.lastDraggedActivity$.subscribe(activity =>
      this.activityDropped.emit(activity)
    );
  }

  ngAfterViewInit(): void {
    this.timeline.setupZoom(this.svgEl);
  }
}
