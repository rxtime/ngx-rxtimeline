import { Axis } from '../axis';
import { Orientation } from '../../orientation';
import { map } from 'rxjs/operators';
import { ScaleBand } from 'd3-scale';
import { Injectable } from '@angular/core';
import { Tick } from '../tick';
import { ScalesService } from '../../scales.service';
import { OptionsService } from '../../options.service';
import { AxisService } from '../axis.service';

@Injectable({ providedIn: 'root' })
export class ResourcesAxisService {
  vm$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxis(scales.scaleBand, scales.state.timelineOrientation)
    )
  );

  constructor(
    private scalesService: ScalesService,
    private optionsService: OptionsService,
    private axisService: AxisService
  ) {}

  private createAxis(
    scaleBand: ScaleBand<string>,
    timelineOrientation: Orientation
  ): Axis {
    const orientation = this.optionsService.flipOrientation(
      timelineOrientation
    );

    return {
      ticks: this.getTicks(scaleBand, orientation),
      axisLine: this.axisService.getAxisLine(scaleBand, orientation)
    };
  }

  private getTicks(scale: ScaleBand<string>, orientation: Orientation): Tick[] {
    return scale.domain().map(value => ({
      label: value,
      transform: this.optionsService.getTranslation(
        this.getBandMidPoint(scale, value),
        orientation
      )
    }));
  }

  private getBandMidPoint(scale: ScaleBand<string>, tick: string) {
    return scale(tick) + scale.bandwidth() / 2;
  }
}
