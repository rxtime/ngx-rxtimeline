import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivityRectangle } from './activity-rectangle';
import { ActivityDragService } from './activity-drag.service';

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
      <svg:text dy="1em">{{ activityRectangle.title }}</svg:text>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityRectangleComponent implements AfterViewInit {
  @Input() activityRectangle: ActivityRectangle;

  @ViewChild('activityRectangleEl') activityRectangleEl: ElementRef;

  constructor(private activityDragService: ActivityDragService) {}

  ngAfterViewInit() {
    this.setupDrag();
  }

  private setupDrag() {
    if (this.activityRectangleEl) {
      this.activityDragService.setupDrag(
        this.activityRectangle,
        this.activityRectangleEl.nativeElement
      );
    }
  }
}
