import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { EventRectangle } from './content';
import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';
import { Store } from '../store/store';
import * as fromActions from '../store/actions';

@Component({
  selector: '[ngx-d3timeline-event-rectangle]',
  template: `
    <svg:g
      [attr.transform]="eventRectangle.transform"
      *ngIf="eventRectangle"
      #eventRectangleEl
    >
      <svg:rect
        [attr.height]="eventRectangle.height"
        [attr.width]="eventRectangle.width"
      ></svg:rect>
      <svg:text dy="1em">{{ eventRectangle.title }}</svg:text>
    </svg:g>
  `,
  styles: [
    `
      rect {
        fill: #fff;
        stroke: #000;
      }

      text {
        font-size: 10px;
      }
    `
  ]
})
export class EventRectangleComponent implements AfterViewInit {
  @Input() eventRectangle: EventRectangle;

  @ViewChild('eventRectangleEl') eventRectangleEl: ElementRef;

  constructor(private store: Store) {}

  ngAfterViewInit() {
    this.setupDrag();
  }

  private setupDrag() {
    if (this.eventRectangleEl) {
      const onDrag = drag()
        .on('start', this.onDragStarted.bind(this))
        .on('drag', this.onDragging.bind(this))
        .on('end', this.onDragEnded.bind(this));

      onDrag(select(this.eventRectangleEl.nativeElement));
    }
  }

  private onDragStarted() {
    this.store.dispatch(
      new fromActions.TimelineDragStartedAction(this.eventRectangle.id)
    );
  }

  private onDragging() {
    this.store.dispatch(
      new fromActions.TimelineDraggingAction({
        eventRectangle: this.eventRectangle,
        event
      })
    );
  }

  private onDragEnded() {
    this.store.dispatch(
      new fromActions.TimelineDragEndedAction(this.eventRectangle.id)
    );
  }
}
