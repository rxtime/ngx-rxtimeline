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
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { Activity } from './activity/activity';

import { NgxD3TimelineService } from './ngx-d3timeline.service';
import { Options } from './options/options';

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
      <ng-container *ngIf="timeline.showRectangles$ | async">
        <g
          ngx-d3timeline-resource-rectangle
          *ngFor="let resourceRectangle of timeline.resourceRectangles$ | async"
          [resourceRectangle]="resourceRectangle"
        ></g>
      </ng-container>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxD3TimelineService]
})
export class NgxD3timelineComponent implements OnInit, AfterViewInit {
  @Input() set activities(value: Activity[]) {
    this.timeline.setActivities(value);
  }

  @Input() set options(options: Options) {
    this.timeline.setOptions(options);
  }

  @Output() activityDropped = new EventEmitter<Activity>();
  @Output() hovered = new EventEmitter<Activity>();
  @Output() unhovered = new EventEmitter<Activity>();

  @ViewChild('svgEl') svgEl: ElementRef<SVGElement>;

  constructor(
    public timeline: NgxD3TimelineService,
    private hostElement: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initEventEmitters();
    this.timeline.setupResizing(this.hostElement, this.changeDetector);
  }

  ngAfterViewInit(): void {
    this.timeline.setupZoom(this.svgEl);
  }

  private initEventEmitters() {
    this.timeline.onActivityDropped(this.activityDropped);
    this.timeline.onHovered(this.hovered);
    this.timeline.onUnhovered(this.unhovered);
  }
}
