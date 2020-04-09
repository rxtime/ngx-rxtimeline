import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Activity } from './activity/activity';

import { NgxrxtimelineService } from './ngx-rxtimeline.service';
import { Options } from './options/options';
import { Identifier } from './core/identifiable';
import { ResourceRectangle } from './resource-rectangle/resource-rectangle';

@Component({
  selector: 'ngx-rxtimeline',
  template: `
    <svg
      #svgEl
      *ngIf="timeline.view$ | async as view"
      [attr.width]="view.width"
      [attr.height]="view.height"
      class="ngx-rxtimeline"
    >
      <g
        ngx-rxtimeline-axis
        class="time-axis"
        [axis]="timeline.timeAxis$ | async"
      ></g>
      <g
        ngx-rxtimeline-resource-rectangle
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
          let tickMarkRectangle of timeline.resourceTickMarkRectangles$ | async;
          trackBy: trackByFn
        "
        class="resource-title-background"
        ngx-rxtimeline-resource-rectangle
        [resourceRectangle]="tickMarkRectangle"
      ></g>
      <g
        ngx-rxtimeline-axis
        class="resources-axis"
        [axis]="timeline.resourceAxis$ | async"
      ></g>
      <g
        ngx-rxtimeline-content
        (hovered)="activityHovered.emit($event)"
        (unhovered)="activityUnhovered.emit($event)"
        (selected)="activitySelected.emit($event)"
      ></g>
    </svg>
  `,
  styleUrls: ['./ngx-rxtimeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxrxtimelineService]
})
export class NgxrxtimelineComponent implements OnInit {
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
    this.timeline.setupZoom(el);
  }

  constructor(public timeline: NgxrxtimelineService) {}

  ngOnInit(): void {
    this.timeline.onActivityDropped(this.activityDropped);
    this.timeline.setupResizing();
  }

  trackByFn(resourceRectangle: ResourceRectangle) {
    return resourceRectangle.id;
  }
}
