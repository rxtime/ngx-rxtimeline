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
      [class.draggable]="!activityRectangle.disableDrag"
      [class.hovered]="activityRectangle.hovered"
      [class.selected]="activityRectangle.selected"
    >
      <svg:rect
        [attr.height]="activityRectangle.height"
        [attr.width]="activityRectangle.width"
        [attr.stroke-width]="activityRectangle.strokeWidth"
      ></svg:rect>
      <svg:g
        *ngIf="activityRectangle.showTitle"
        ngx-d3timeline-activity-content
        [content]="activityRectangle.content"
      ></svg:g>
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
