import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { EventRectangle } from './event-rectangle';
import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';
import { Store } from '../store/store';
import * as fromActions from '../store/actions';

@Component({
  selector: '[ngx-d3timeline-event-rectangle]',
  template: `
    <svg:g
      class="event-rectangle"
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
  `
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
      new fromActions.TimelineDragStartedAction({
        eventRectangle: this.eventRectangle,
        event
      })
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
