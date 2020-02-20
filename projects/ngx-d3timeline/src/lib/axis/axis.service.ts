import { Axis } from './axis';
import { Orientation } from '../orientation';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Tick } from './tick';
import { Line } from './line';
import { ScalesService } from '../scales.service';
import { OptionsService } from '../options.service';
import { TimelineView } from '../view/timeline-view';
import { BandScale, TimeScale } from '../scale-types';

@Injectable({ providedIn: 'root' })
export class AxisService {
  resourceAxis$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxis(
        scales.scaleBand,
        scales.state.axisOrientations.resourceOrientation,
        scales.state.view
      )
    )
  );

  timeAxis$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxis(
        scales.scaleTime,
        scales.state.axisOrientations.timeOrientation,
        scales.state.view
      )
    )
  );

  constructor(
    private scalesService: ScalesService,
    private optionsService: OptionsService
  ) {}

  private createAxis(
    scale: BandScale | TimeScale,
    orientation: Orientation,
    timelineView: TimelineView
  ): Axis {
    return {
      ticks: this.getTicks(scale, orientation, timelineView),
      axisLine: this.getAxisLine(scale, orientation, timelineView)
    };
  }

  private getTicks(
    scale: BandScale | TimeScale,
    orientation: Orientation,
    timelineView: TimelineView
  ): Tick[] {
    return this.getScaleTicks(scale).map(value => ({
      label: this.getLabel(scale, value),
      transform: this.optionsService.getTranslation(
        this.getTransform(scale, value),
        orientation,
        timelineView
      )
    }));
  }

  private getScaleTicks(scale: TimeScale | BandScale): any[] {
    if (this.isScaleTime(scale)) {
      return scale.ticks();
    }

    return (scale as BandScale).domain();
  }

  private getLabel(scale: TimeScale | BandScale, tick: any) {
    if (this.isScaleTime(scale)) {
      return scale.tickFormat()(tick);
    }

    return tick;
  }

  private getTransform(scale: TimeScale | BandScale, tick: any) {
    if (this.isScaleTime(scale)) {
      return scale(tick);
    }

    return this.getBandMidPoint(scale as BandScale, tick);
  }

  private isScaleTime(scale: TimeScale | BandScale): scale is TimeScale {
    return scale.domain()[0] instanceof Date;
  }

  private getBandMidPoint(scale: BandScale, tick: string) {
    return scale(tick) + scale.bandwidth() / 2;
  }

  private getAxisLine(
    scale: BandScale | TimeScale,
    orientation: Orientation,
    timelineView: TimelineView
  ): Line {
    const axisLine: Line = {
      x1: timelineView.left,
      x2: timelineView.left,
      y1: timelineView.top,
      y2: timelineView.top
    };
    const rangeLimit = scale.range()[1];

    return orientation === Orientation.Vertical
      ? { ...axisLine, y2: rangeLimit }
      : { ...axisLine, x2: rangeLimit };
  }
}
