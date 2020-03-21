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
import { activityTitlePadding } from '../content/content-utils';

@Component({
  selector: '[ngx-d3timeline-activity-rectangle]',
  template: `
    <svg:g
      class="activity-rectangle"
      [attr.transform]="activityRectangle.transform"
      *ngIf="activityRectangle"
      #activityRectangleEl
    >
      <svg:rect
        [attr.height]="activityRectangle.height"
        [attr.width]="activityRectangle.width"
      ></svg:rect>
      <svg:g *ngIf="activityRectangle.showTitle">
        <svg:text
          dominant-baseline="hanging"
          [attr.dx]="activityTitlePadding"
          [attr.dy]="activityTitlePadding"
          [attr.font-size]="activityRectangle.fontSize"
        >
          {{ activityRectangle.title }}
        </svg:text>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityRectangleComponent implements AfterViewInit {
  @Input() activityRectangle: ActivityRectangle;

  @ViewChild('activityRectangleEl') activityRectangleEl: ElementRef;

  activityTitlePadding = activityTitlePadding;

  constructor(public facade: ActivityRectangleService) {}

  ngAfterViewInit() {
    this.facade.setupDrag(this.activityRectangle, this.activityRectangleEl);
  }
}
