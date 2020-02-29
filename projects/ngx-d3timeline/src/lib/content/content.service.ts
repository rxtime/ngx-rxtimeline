import { Injectable } from '@angular/core';
import { ScalesService } from '../scales.service';
import { State } from '../state';
import { map } from 'rxjs/operators';
import { TimelineEvent } from '../timeline-event';
import { EventRectangle } from './content';
import { Orientation } from '../orientation';
import { TimeScale, BandScale } from '../scale-types';
import { combineLatest } from 'rxjs';
import { DragService } from './drag.service';
import { EventRectangleDragEvent } from './event-rectangle-drag-event';

@Injectable({ providedIn: 'root' })
export class ContentService {
  eventRectangles$ = combineLatest([
    this.scalesService.scales$,
    this.dragService.drag$
  ]).pipe(
    map(([scales, dragEvent]) => this.createEventRectangles(scales, dragEvent))
  );

  constructor(
    private scalesService: ScalesService,
    private dragService: DragService
  ) {}

  createEventRectangles(
    {
      scaleBand,
      scaleTime,
      state
    }: {
      scaleBand: BandScale;
      scaleTime: TimeScale;
      state: State;
    },
    dragEvent: EventRectangleDragEvent
  ): EventRectangle[] {
    return state.data.map(d => ({
      id: d.id,
      title: d.type,
      transform: this.dataTransform(
        d,
        state.orientations.time,
        scaleBand,
        scaleTime,
        dragEvent.id === d.id ? dragEvent : null
      ),
      width: this.rectWidth(d, state.orientations.time, scaleBand, scaleTime),
      height: this.rectHeight(d, state.orientations.time, scaleBand, scaleTime)
    }));
  }

  dataTransform(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale,
    dragEvent: EventRectangleDragEvent
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
