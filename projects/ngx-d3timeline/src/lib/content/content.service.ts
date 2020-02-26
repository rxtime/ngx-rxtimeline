import { Injectable } from '@angular/core';
import { ScalesService } from '../scales.service';
import { State } from '../state';
import { map } from 'rxjs/operators';
import { TimelineEvent } from '../timeline-event';
import { EventRectangle } from './content';
import { Orientation } from '../orientation';
import { TimeScale, BandScale } from '../scale-types';
import { DragService } from './drag.service';
import { EventRectangleDragEvent } from './event-rectangle-drag-event';

@Injectable({ providedIn: 'root' })
export class ContentService {
  eventRectangles$ = this.scalesService.scales$.pipe(
    map(scales => this.createEventRectangles(scales))
  );

  constructor(private scalesService: ScalesService) {}

  createEventRectangles({
    scaleBand,
    scaleTime,
    state
  }: {
    scaleBand: BandScale;
    scaleTime: TimeScale;
    state: State;
  }): EventRectangle[] {
    return state.data.map(d => ({
      id: d.id,
      title: d.type,
      transform: this.dataTransform(
        d,
        state.axisOrientations.timeOrientation,
        scaleBand,
        scaleTime,
        state.dragEvent
      ),
      width: this.rectWidth(
        d,
        state.axisOrientations.timeOrientation,
        scaleBand,
        scaleTime
      ),
      height: this.rectHeight(
        d,
        state.axisOrientations.timeOrientation,
        scaleBand,
        scaleTime
      )
    }));
  }

  dataTransform(
    data: TimelineEvent,
    timeOrientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale,
    dragEvent: EventRectangleDragEvent
  ) {
    dragEvent =
      dragEvent && dragEvent.id === data.id ? dragEvent : DragService.dragSeed;

    return `translate(${this.getEventX(
      data,
      timeOrientation,
      scaleBand,
      scaleTime,
      dragEvent.dx
    )}, ${this.getEventY(
      data,
      timeOrientation,
      scaleBand,
      scaleTime,
      dragEvent.dy
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
    deltaResources: number
  ): number {
    return scaleBand(data.series) + deltaResources;
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
