import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivityRectangle } from './activity-rectangle';
import { ActivityRectangleService } from './activity-rectangle.service';

@Component({
  selector: '[ngx-d3timeline-activity-rectangle]',
  template: `
    <svg:g
      class="activity-rectangle"
      [attr.transform]="activityRectangle.transform"
      *ngIf="activityRectangle"
      #activityRectangleEl
      [ngClass]="activityRectangle.type"
    >
      <svg:rect
        [attr.height]="activityRectangle.height"
        [attr.width]="activityRectangle.width"
        [attr.stroke-width]="activityRectangle.strokeWidth"
        [class.draggable]="!activityRectangle.disableDrag"
      ></svg:rect>
      <svg:g *ngIf="activityRectangle.showTitle">
        <svg:text
          dominant-baseline="hanging"
          [attr.dx]="activityRectangle.padding"
          [attr.dy]="activityRectangle.padding"
          [attr.font-family]="activityRectangle.fontFace"
          [attr.font-size]="activityRectangle.fontSize"
        >
          {{ activityRectangle.title }}
        </svg:text>
        <svg:text
          dominant-baseline="hanging"
          [attr.dx]="activityRectangle.padding"
          [attr.dy]="activityRectangle.padding + 14"
          [attr.font-family]="activityRectangle.fontFace"
          [attr.font-size]="activityRectangle.fontSize"
        >
          {{ activityRectangle.description }}
        </svg:text>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityRectangleComponent implements AfterViewInit {
  @Input() activityRectangle: ActivityRectangle;

  @ViewChild('activityRectangleEl') activityRectangleEl: ElementRef;

  constructor(public facade: ActivityRectangleService) {}

  ngAfterViewInit() {
    this.facade.setupDrag(this.activityRectangle, this.activityRectangleEl);
  }
}
