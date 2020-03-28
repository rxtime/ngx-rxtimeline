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
import { Activity } from './activity/activity';

import { NgxD3TimelineService } from './ngx-d3timeline.service';
import { Options } from './options/options';
import { ObservableOutputMap } from './core/observable-output-map';

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
        ngx-d3timeline-resource-rectangle
        *ngFor="let resourceRectangle of timeline.resourceRectangles$ | async"
        [resourceRectangle]="resourceRectangle"
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

  @Input() set options(options: Options) {
    this.timeline.setOptions(options);
  }

  @Output() activityDropped = new EventEmitter<Activity>();
  @Output() hovered = new EventEmitter<Activity>();
  @Output() unhovered = new EventEmitter<Activity>();

  @ViewChild('svgEl') svgEl: ElementRef<SVGElement>;

  private get observableToOutputMappings(): ObservableOutputMap<Activity>[] {
    return [
      { observable$: this.timeline.hoveredActivity$, output: this.hovered },
      { observable$: this.timeline.unhoveredActivity$, output: this.unhovered },
      {
        observable$: this.timeline.activityDropped$,
        output: this.activityDropped
      }
    ];
  }

  constructor(public timeline: NgxD3TimelineService) {}

  ngOnInit(): void {
    this.timeline.setupOutputs(this.observableToOutputMappings);
  }

  ngAfterViewInit(): void {
    this.timeline.setupZoom(this.svgEl);
  }
}
