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
        *ngFor="
          let tickMarkRectangle of timeline.resourceTickMarkRectangles$ | async
        "
        class="resource-title-background"
        ngx-d3timeline-resource-rectangle
        [resourceRectangle]="tickMarkRectangle"
      ></g>
      <g
        ngx-d3timeline-axis
        class="resources-axis"
        [axis]="timeline.resourceAxis$ | async"
      ></g>

      <ng-container *ngIf="timeline.showRectangles$ | async">
        <g
          ngx-d3timeline-resource-rectangle
          class="resource-rectangle"
          *ngFor="let resourceRectangle of timeline.resourceRectangles$ | async"
          [resourceRectangle]="resourceRectangle"
          (mouseenter)="resourceHovered.emit(resourceRectangle.id)"
          (mouseleave)="resourceUnhovered.emit(resourceRectangle.id)"
        ></g>
      </ng-container>
      <g
        ngx-d3timeline-axis
        class="time-axis"
        [axis]="timeline.timeAxis$ | async"
      ></g>
      <g
        ngx-d3timeline-content
        (hovered)="activityHovered.emit($event)"
        (unhovered)="activityUnhovered.emit($event)"
      ></g>
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

  @Input() set view([width, height]: [number, number]) {
    this.timeline.setView([width, height]);
  }

  @Input() set options(options: Options) {
    this.timeline.setOptions(options);
  }

  @Output() activityDropped = new EventEmitter<Activity>();
  @Output() resourceHovered = new EventEmitter<string>();
  @Output() resourceUnhovered = new EventEmitter<string>();
  @Output() activityHovered = new EventEmitter<Activity>();
  @Output() activityUnhovered = new EventEmitter<Activity>();

  @ViewChild('svgEl') svgEl: ElementRef<SVGElement>;

  constructor(public timeline: NgxD3TimelineService) {}

  ngOnInit(): void {
    this.timeline.onActivityDropped(this.activityDropped);
  }

  ngAfterViewInit(): void {
    this.timeline.setupZoom(this.svgEl);
  }
}
