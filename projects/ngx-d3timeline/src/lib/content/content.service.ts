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

@Injectable({ providedIn: 'root' })
export class ContentService {
  eventRectangles$ = combineLatest([
    this.scalesService.scales$,
    this.dragService.drag$
  ]).pipe(
    map(([scales, dragEvent]) =>
      dragEvent
        ? this.updateDataInScales(
            scales,
            this.shiftDraggedTimelineEvent(
              scales.state.data,
              dragEvent,
              scales.scaleTime
            )
          )
        : scales
    ),
    map(scales => this.createEventRectangles(scales))
  );

  constructor(
    private scalesService: ScalesService,
    private dragService: DragService
  ) {}

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
        scaleTime
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
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return `translate(${this.getEventX(
      data,
      orientation,
      scaleBand,
      scaleTime
    )}, ${this.getEventY(data, orientation, scaleBand, scaleTime)})`;
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

  private updateDataInScales(
    scales: {
      scaleBand: BandScale;
      scaleTime: TimeScale;
      state: State;
    },
    data: TimelineEvent[]
  ): {
    scaleBand: BandScale;
    scaleTime: TimeScale;
    state: State;
  } {
    return {
      ...scales,
      state: {
        ...scales.state,
        data
      }
    };
  }

  private shiftDraggedTimelineEvent(
    data: TimelineEvent[],
    dragEvent: any,
    timeScale: TimeScale
  ) {
    return data.map(d =>
      d.id === dragEvent.id
        ? this.shiftTimelineEventForDrag(d, dragEvent, timeScale)
        : d
    );
  }

  private shiftTimelineEventForDrag(
    data: TimelineEvent,
    dragEvent: any,
    timeScale: TimeScale
  ): TimelineEvent {
    const shiftedEventStart = timeScale(data.start) + dragEvent.dy;
    const shiftedEventFinish = timeScale(data.finish) + dragEvent.dy;

    return {
      ...data,
      start: timeScale.invert(shiftedEventStart),
      finish: timeScale.invert(shiftedEventFinish)
    };
  }
}
