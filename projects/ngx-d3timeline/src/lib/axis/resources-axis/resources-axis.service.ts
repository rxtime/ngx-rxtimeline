import { AxisViewModel } from '../axis-view-model';
import { Orientation } from '../../orientation';
import { map } from 'rxjs/operators';
import { ScaleBand } from 'd3-scale';
import { Injectable } from '@angular/core';
import { TickInfo } from '../tick-info';
import { Line } from '../line';
import { ScalesService } from '../../scales.service';
import { OptionsService } from '../../options.service';

@Injectable({ providedIn: 'root' })
export class ResourcesAxisService {
  vm$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxisViewModel(
        scales.scaleBand,
        scales.state.timelineOrientation
      )
    )
  );

  constructor(
    private scalesService: ScalesService,
    private optionsService: OptionsService
  ) {}

  private createAxisViewModel(
    scaleBand: ScaleBand<string>,
    timelineOrientation: Orientation
  ): AxisViewModel {
    const orientation = this.optionsService.flipOrientation(
      timelineOrientation
    );

    return {
      tickInfos: this.getTickInfos(scaleBand, orientation),
      axisLine: this.getAxisLine(scaleBand, orientation)
    };
  }

  private getTickInfos(
    scale: ScaleBand<string>,
    orientation: Orientation
  ): TickInfo[] {
    return scale.domain().map(value => ({
      label: value,
      transform: this.tickTransform(
        this.getBandMidPoint(scale, value),
        orientation
      )
    }));
  }

  private getAxisLine(
    scale: ScaleBand<string>,
    orientation: Orientation
  ): Line {
    const axisLine: Line = { x1: 0, x2: 0, y1: 0, y2: 0 };
    const rangeLimit = scale.range()[1];

    return orientation === Orientation.Vertical
      ? { ...axisLine, y2: rangeLimit }
      : { ...axisLine, x2: rangeLimit };
  }

  private tickTransform(range: number, orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? `translate(0, ${range})`
      : `translate(${range}, 0)`;
  }

  private getBandMidPoint(scale: ScaleBand<string>, tick: string) {
    return scale(tick) + scale.bandwidth() / 2;
  }
}
