import { Injectable } from '@angular/core';
import { ScalesService } from '../scales.service';
import { State } from '../state';
import { ScaleBand, ScaleTime } from 'd3-scale';
import { map } from 'rxjs/operators';
import { TimelineEvent } from '../timeline-event';
import { EventRectangle } from './content';
import { Orientation } from '../orientation';

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
    scaleBand: ScaleBand<string>;
    scaleTime: ScaleTime<number, number>;
    state: State;
  }): EventRectangle[] {
    return state.data.map(d => ({
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
    scaleBand: ScaleBand<string>,
    scaleTime: ScaleTime<number, number>
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
    scaleBand: ScaleBand<string>,
    scaleTime: ScaleTime<number, number>
  ) {
    return orientation === Orientation.Vertical
      ? this.rectTimeBreadth(data, scaleTime)
      : this.rectResourceBreadth(scaleBand);
  }

  rectWidth(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: ScaleBand<string>,
    scaleTime: ScaleTime<number, number>
  ) {
    return orientation === Orientation.Vertical
      ? this.rectResourceBreadth(scaleBand)
      : this.rectTimeBreadth(data, scaleTime);
  }
  private getEventX(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: ScaleBand<string>,
    scaleTime: ScaleTime<number, number>
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInResourceAxis(data, scaleBand)
      : this.positionInTimeAxis(data, scaleTime);
  }

  private getEventY(
    data: TimelineEvent,
    orientation: Orientation,
    scaleBand: ScaleBand<string>,
    scaleTime: ScaleTime<number, number>
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInTimeAxis(data, scaleTime)
      : this.positionInResourceAxis(data, scaleBand);
  }

  private positionInResourceAxis(
    data: TimelineEvent,
    scaleBand: ScaleBand<string>
  ): number {
    return scaleBand(data.series);
  }

  private positionInTimeAxis(
    data: TimelineEvent,
    scaleTime: ScaleTime<number, number>
  ): number {
    return scaleTime(data.start);
  }

  private rectTimeBreadth(
    data: TimelineEvent,
    scaleTime: ScaleTime<number, number>
  ): number {
    return scaleTime(data.finish) - scaleTime(data.start);
  }

  private rectResourceBreadth(scaleBand: ScaleBand<string>): number {
    return scaleBand.bandwidth();
  }
}
