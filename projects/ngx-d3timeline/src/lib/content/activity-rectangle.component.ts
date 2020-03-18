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
      <svg:g *ngIf="showLabel">
        <svg:text dominant-baseline="hanging" dx="2" dy="2">
          {{ activityRectangle.title }}
        </svg:text>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityRectangleComponent implements AfterViewInit {
  labelFontHeight = 10;
  labelPaddingEachSide = 1;
  minHeightToShowLabel = this.labelFontHeight + this.labelPaddingEachSide * 2;

  @Input() activityRectangle: ActivityRectangle;

  @ViewChild('activityRectangleEl') activityRectangleEl: ElementRef;

  constructor(private activityDragService: ActivityDragService) {}

  ngAfterViewInit() {
    this.setupDrag();
  }

  get showLabel(): boolean {
    return this.activityRectangle.height >= this.minHeightToShowLabel; // TODO consider orientation
  }

  private setupDrag() {
    if (this.activityRectangleEl) {
      this.activityDragService.setupDrag(
        this.activityRectangle.id,
        this.activityRectangleEl.nativeElement
      );
    }
  }
}
