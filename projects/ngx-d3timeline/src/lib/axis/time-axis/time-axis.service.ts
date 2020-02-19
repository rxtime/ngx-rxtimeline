import { Injectable } from '@angular/core';
import { ScalesService } from '../../scales.service';
import { ScaleTime } from 'd3-scale';
import { Orientation } from '../../orientation';
import { Axis } from '../axis';
import { Tick } from '../tick';
import { map } from 'rxjs/operators';
import { OptionsService } from '../../options.service';
import { AxisService } from '../axis.service';

@Injectable({ providedIn: 'root' })
export class TimeAxisService {
  vm$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxis(scales.scaleTime, scales.state.timelineOrientation)
    )
  );

  constructor(
    private scalesService: ScalesService,
    private optionsService: OptionsService,
    private axisService: AxisService
  ) {}

  private createAxis(
    scaleTime: ScaleTime<number, number>,
    timelineOrientation: Orientation
  ): Axis {
    return {
      ticks: this.getTicks(scaleTime, timelineOrientation),
      axisLine: this.axisService.getAxisLine(scaleTime, timelineOrientation)
    };
  }

  private getTicks(
    scale: ScaleTime<number, number>,
    orientation: Orientation
  ): Tick[] {
    return scale.ticks().map(value => ({
      label: scale.tickFormat()(value),
      transform: this.optionsService.getTranslation(scale(value), orientation)
    }));
  }
}
