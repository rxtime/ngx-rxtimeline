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
        <svg:text dy="1em">
          {{ activityRectangle.title }}
        </svg:text>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityRectangleComponent implements AfterViewInit {
  labelFontHeight = 10;
  minHeightToShowLabel = this.labelFontHeight + 2;

  @Input() activityRectangle: ActivityRectangle;

  @ViewChild('activityRectangleEl') activityRectangleEl: ElementRef;

  constructor(private activityDragService: ActivityDragService) {}

  ngAfterViewInit() {
    this.setupDrag();
  }

  get showLabel(): boolean {
    return this.activityRectangle.height >= this.minHeightToShowLabel;
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
