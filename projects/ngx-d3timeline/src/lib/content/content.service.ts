import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { State } from '../store/state';
import { map } from 'rxjs/operators';
import { TimelineEvent } from '../timeline-event';
import { EventRectangle } from './content';
import { Orientation } from '../orientation';
import { TimeScale, BandScale } from '../scale-types';
import { TimelineDragEvent } from './timeline-drag-event';

@Injectable({ providedIn: 'root' })
export class ContentService {
  eventRectangles$ = this.store.state$.pipe(
    map(this.createEventRectangles.bind(this))
  );

  constructor(private store: Store) {}

  createEventRectangles(state: State): EventRectangle[] {
    return state.data.map(d => ({
      id: d.id,
      title: d.type,
      transform: this.dataTransform(
        d,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale,
        state.dragEvent && state.dragEvent.id === d.id ? state.dragEvent : null
      ),
      width: this.rectWidth(
        d,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale
      ),
      height: this.rectHeight(
        d,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale
      )
    }));
  }

  dataTransform(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale,
    dragEvent: TimelineDragEvent
  ) {
    return `translate(${this.getEventX(
      data,
      orientation,
      scaleBand,
      scaleTime,
      dragEvent && dragEvent.dx
    )}, ${this.getEventY(
      data,
      orientation,
      scaleBand,
      scaleTime,
      dragEvent && dragEvent.dy
    )})`;
  }

  rectHeight(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectTimeBreadth(data, scaleTime)
      : this.rectResourceBreadth(scaleBand);
  }

  rectWidth(
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
    scaleTime: TimeScale,
    dragEventDx: number
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInResourceAxis(data, scaleBand, dragEventDx)
      : this.positionInTimeAxis(data, scaleTime, dragEventDx);
  }

  private getEventY(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale,
    dragEventDy: number
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInTimeAxis(data, scaleTime, dragEventDy)
      : this.positionInResourceAxis(data, scaleBand, dragEventDy);
  }

  private positionInResourceAxis(
    data: TimelineEvent,
    scaleBand: BandScale,
    dragDelta: number
  ): number {
    return scaleBand(data.series) + dragDelta;
  }

  private positionInTimeAxis(
    data: TimelineEvent,
    scaleTime: TimeScale,
    dragDelta: number
  ): number {
    return scaleTime(data.start) + dragDelta;
  }

  private rectTimeBreadth(data: TimelineEvent, scaleTime: TimeScale): number {
    return scaleTime(data.finish) - scaleTime(data.start);
  }

  private rectResourceBreadth(scaleBand: BandScale): number {
    return scaleBand.bandwidth();
  }
}
