import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';
import { Activity } from './activity/activity';

import { NgxD3TimelineService } from './ngx-d3timeline.service';
import { Options } from './options/options';
import { Identifier } from './core/identifiable';
import { ResourceRectangle } from './resource-rectangle/resource-rectangle';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <ng-container *ngIf="timeline.view$ | async as view">
      <svg
        #svgEl
        *ngIf="!view.isEmpty"
        [attr.width]="view.width"
        [attr.height]="view.height"
        class="ngx-d3timeline"
      >
        <g
          ngx-d3timeline-axis
          class="time-axis"
          [axis]="timeline.timeAxis$ | async"
        ></g>
        <g
          ngx-d3timeline-resource-rectangle
          class="resource-rectangle"
          *ngFor="
            let resourceRectangle of timeline.resourceRectangles$ | async;
            trackBy: trackByFn
          "
          [resourceRectangle]="resourceRectangle"
          (mouseenter)="resourceHovered.emit(resourceRectangle.id)"
          (mouseleave)="resourceUnhovered.emit(resourceRectangle.id)"
          (click)="resourceSelected.emit(resourceRectangle.id)"
        ></g>
        <g
          *ngFor="
            let tickMarkRectangle of timeline.resourceTickMarkRectangles$
              | async;
            trackBy: trackByFn
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
        <g
          ngx-d3timeline-content
          (hovered)="activityHovered.emit($event)"
          (unhovered)="activityUnhovered.emit($event)"
          (selected)="activitySelected.emit($event)"
        ></g>
      </svg>
    </ng-container>
  `,
  styleUrls: ['./ngx-d3timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxD3TimelineService]
})
export class NgxD3timelineComponent implements OnInit {
  @Input() set activities(value: Activity[]) {
    this.timeline.setActivities(value);
  }

  @Input() set options(options: Options) {
    this.timeline.setOptions(options);
  }

  @Input() set selectedId(id: Identifier) {
    this.timeline.setSelectedId(id);
  }

  @Input() set hoveredId(id: Identifier) {
    this.timeline.setHoveredId(id);
  }

  @Output() activityDropped = new EventEmitter<Activity>();
  @Output() resourceHovered = new EventEmitter<string>();
  @Output() resourceUnhovered = new EventEmitter<string>();
  @Output() resourceSelected = new EventEmitter<string>();
  @Output() activityHovered = new EventEmitter<Identifier>();
  @Output() activityUnhovered = new EventEmitter<Identifier>();
  @Output() activitySelected = new EventEmitter<Identifier>();

  @ViewChild('svgEl') set svgElement(el: ElementRef<SVGElement>) {
    // TODO remove zoom events from old SVG?
    this.timeline.setupZoom(el);
  }

  constructor(public timeline: NgxD3TimelineService) {}

  ngOnInit(): void {
    this.timeline.onActivityDropped(this.activityDropped);
  }

  trackByFn(resourceRectangle: ResourceRectangle) {
    return resourceRectangle.id;
  }
}
