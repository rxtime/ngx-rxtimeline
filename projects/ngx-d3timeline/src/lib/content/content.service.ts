import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { State } from '../store/state';
import { map } from 'rxjs/operators';
import { TimelineEvent } from '../timeline-event';
import { EventRectangle } from './event-rectangle';
import { Orientation } from '../orientation';
import { TimeScale, BandScale } from '../scale-types';
import { TimelineDragEvent } from './timeline-drag-event';
import { getDraggingTimelineEvent, getDropTimelineEvent } from '../drag-utils';

@Injectable({ providedIn: 'root' })
export class ContentService {
  eventRectangles$ = this.store.state$.pipe(
    map(state => this.createEventRectangles(state))
  );

  draggingRectangle$ = this.store.state$.pipe(
    map(state => this.createDraggingRectangle(state))
  );

  dropRectangle$ = this.store.state$.pipe(
    map(state => this.createDropRectangle(state))
  );

  fromRectangle$ = this.store.state$.pipe(
    map(state => this.createFromRectangle(state))
  );

  constructor(private store: Store) {}

  private createFromRectangle(state: State) {
    const draggingTimelineEvent = getDraggingTimelineEvent(state);
    return (
      draggingTimelineEvent &&
      this.timelineEventToEventRectangle(draggingTimelineEvent, state)
    );
  }

  private createEventRectangles(state: State): EventRectangle[] {
    return state.data
      .filter(data => data.id !== (state.dragEvent && state.dragEvent.id))
      .map(data => this.timelineEventToEventRectangle(data, state));
  }

  private createDraggingRectangle(state: State): EventRectangle {
    const draggingTimelineEvent = getDraggingTimelineEvent(state);
    return (
      draggingTimelineEvent &&
      this.timelineEventToEventRectangle(
        draggingTimelineEvent,
        state,
        state.dragEvent
      )
    );
  }

  private createDropRectangle(state: State): EventRectangle {
    const dropTimelineEvent = getDropTimelineEvent(state);

    return (
      dropTimelineEvent &&
      this.timelineEventToEventRectangle(dropTimelineEvent, state)
    );
  }

  private timelineEventToEventRectangle(
    timelineEvent: TimelineEvent,
    state: State,
    dragEvent?: TimelineDragEvent
  ): EventRectangle {
    return {
      id: timelineEvent.id,
      title: timelineEvent.type,
      transform: this.dataTransform(
        timelineEvent,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale,
        dragEvent
      ),
      width: this.rectWidth(
        timelineEvent,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale
      ),
      height: this.rectHeight(
        timelineEvent,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale
      )
    };
  }

  private dataTransform(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale,
    dragEvent?: TimelineDragEvent
  ) {
    const eventX = this.getEventX(data, orientation, scaleBand, scaleTime);
    const dx = (dragEvent && dragEvent.dx) || 0;

    const eventY = this.getEventY(data, orientation, scaleBand, scaleTime);
    const dy = (dragEvent && dragEvent.dy) || 0;

    return `translate(${eventX + dx}, ${eventY + dy})`;
  }

  private rectHeight(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectTimeBreadth(data, scaleTime)
      : this.rectResourceBreadth(scaleBand);
  }

  private rectWidth(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectResourceBreadth(scaleBand)
      : this.rectTimeBreadth(data, scaleTime);
  }
  private getEventX(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInResourceAxis(data, scaleBand)
      : this.positionInTimeAxis(data, scaleTime);
  }

  private getEventY(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInTimeAxis(data, scaleTime)
      : this.positionInResourceAxis(data, scaleBand);
  }

  private positionInResourceAxis(
    data: TimelineEvent,
    scaleBand: BandScale
  ): number {
    return scaleBand(data.series);
  }

  private positionInTimeAxis(
    data: TimelineEvent,
    scaleTime: TimeScale
  ): number {
    return scaleTime(data.start);
  }

  private rectTimeBreadth(data: TimelineEvent, scaleTime: TimeScale): number {
    return scaleTime(data.finish) - scaleTime(data.start);
  }

  private rectResourceBreadth(scaleBand: BandScale): number {
    return scaleBand.bandwidth();
  }
}
