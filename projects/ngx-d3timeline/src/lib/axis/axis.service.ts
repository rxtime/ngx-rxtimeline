import { Axis } from './axis';
import { Orientation } from '../orientation';
import { map } from 'rxjs/operators';
import { ScaleBand, ScaleTime } from 'd3-scale';
import { Injectable } from '@angular/core';
import { Tick } from './tick';
import { Line } from './line';
import { ScalesService } from '../scales.service';
import { OptionsService } from '../options.service';

@Injectable({ providedIn: 'root' })
export class AxisService {
  resourceAxis$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxis(
        scales.scaleBand,
        scales.state.axisOrientations.resourceOrientation
      )
    )
  );

  timeAxis$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxis(
        scales.scaleTime,
        scales.state.axisOrientations.timeOrientation
      )
    )
  );

  constructor(
    private scalesService: ScalesService,
    private optionsService: OptionsService
  ) {}

  private createAxis(
    scale: ScaleBand<string> | ScaleTime<number, number>,
    orientation: Orientation
  ): Axis {
    return {
      ticks: this.getTicks(scale, orientation),
      axisLine: this.getAxisLine(scale, orientation)
    };
  }

  private getTicks(
    scale: ScaleBand<string> | ScaleTime<number, number>,
    orientation: Orientation
  ): Tick[] {
    return this.getScaleTicks(scale).map(value => ({
      label: this.getLabel(scale, value),
      transform: this.optionsService.getTranslation(
        this.getTransform(scale, value),
        orientation
      )
    }));
  }

  private getScaleTicks(
    scale: ScaleTime<number, number> | ScaleBand<string>
  ): any[] {
    if (this.isScaleTime(scale)) {
      return scale.ticks();
    }

    return (scale as ScaleBand<string>).domain();
  }

  private getLabel(
    scale: ScaleTime<number, number> | ScaleBand<string>,
    tick: any
  ) {
    if (this.isScaleTime(scale)) {
      return scale.tickFormat()(tick);
    }

    return tick;
  }

  private getTransform(
    scale: ScaleTime<number, number> | ScaleBand<string>,
    tick: any
  ) {
    if (this.isScaleTime(scale)) {
      scale(tick);
    }

    return this.getBandMidPoint(scale as ScaleBand<string>, tick);
  }

  private isScaleTime(
    scale: ScaleTime<number, number> | ScaleBand<string>
  ): scale is ScaleTime<number, number> {
    return (scale as ScaleTime<number, number>).ticks() !== undefined;
  }

  private getBandMidPoint(scale: ScaleBand<string>, tick: string) {
    return scale(tick) + scale.bandwidth() / 2;
  }

  private getAxisLine(
    scale: ScaleBand<string> | ScaleTime<number, number>,
    orientation: Orientation
  ): Line {
    const axisLine: Line = { x1: 0, x2: 0, y1: 0, y2: 0 };
    const rangeLimit = scale.range()[1];

    return orientation === Orientation.Vertical
      ? { ...axisLine, y2: rangeLimit }
      : { ...axisLine, x2: rangeLimit };
  }
}
