import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivityRectangle } from './activity-rectangle';
import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';
import { Store } from '../store/store';
import * as fromActions from '../store/actions';

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

  constructor(private store: Store) {}

  ngAfterViewInit() {
    this.setupDrag();
  }

  get showLabel(): boolean {
    return this.activityRectangle.height >= this.minHeightToShowLabel;
  }

  private setupDrag() {
    if (this.activityRectangleEl) {
      const onDrag = drag()
        .on('start', this.onDragStarted.bind(this))
        .on('drag', this.onDragging.bind(this))
        .on('end', this.onDragEnded.bind(this));

      onDrag(select(this.activityRectangleEl.nativeElement));
    }
  }

  private onDragStarted() {
    this.store.dispatch(
      new fromActions.TimelineDragStartedAction({
        activityRectangle: this.activityRectangle,
        event
      })
    );
  }

  private onDragging() {
    this.store.dispatch(
      new fromActions.TimelineDraggingAction({
        activityRectangle: this.activityRectangle,
        event
      })
    );
  }

  private onDragEnded() {
    this.store.dispatch(
      new fromActions.TimelineDragEndedAction(this.activityRectangle.id)
    );
  }
}
