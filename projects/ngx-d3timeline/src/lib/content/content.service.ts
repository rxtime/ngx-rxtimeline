import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { selectData, selectTimeOrientation } from '../store/state';
import { map } from 'rxjs/operators';
import { TimelineEvent } from '../timeline-event';
import { EventRectangle } from './content';
import { Orientation } from '../orientation';
import { TimeScale, BandScale } from '../scale-types';
import { combineLatest } from 'rxjs';
import { DragService } from './drag.service';
import { EventRectangleDragEvent } from './event-rectangle-drag-event';
import { selectBandScale, selectTimeScale } from '../store/timeline-selectors';

@Injectable({ providedIn: 'root' })
export class ContentService {
  eventRectangles$ = combineLatest([
    this.store.select(selectData),
    this.store.select(selectTimeOrientation),
    this.store.select(selectBandScale),
    this.store.select(selectTimeScale),
    this.dragService.drag$
  ]).pipe(
    map(([data, orientation, bandScale, timeScale, dragEvent]) =>
      this.createEventRectangles(
        data,
        orientation,
        bandScale,
        timeScale,
        dragEvent
      )
    )
  );

  constructor(private store: Store, private dragService: DragService) {}

  createEventRectangles(
    data: TimelineEvent[],
    timeOrientation: Orientation,
    bandScale: BandScale,
    timeScale: TimeScale,
    dragEvent: EventRectangleDragEvent
  ): EventRectangle[] {
    return data.map(d => ({
      id: d.id,
      title: d.type,
      transform: this.dataTransform(
        d,
        timeOrientation,
        bandScale,
        timeScale,
        dragEvent.id === d.id ? dragEvent : null
      ),
      width: this.rectWidth(d, timeOrientation, bandScale, timeScale),
      height: this.rectHeight(d, timeOrientation, bandScale, timeScale)
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
