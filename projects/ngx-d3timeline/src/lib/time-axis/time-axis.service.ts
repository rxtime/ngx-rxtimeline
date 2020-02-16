import { Injectable } from '@angular/core';
import { ScaleTimeService } from '../scale/scale-time.service';
import { OptionsService } from '../options.service';
import { ScaleTime } from 'd3-scale';
import { Orientation } from '../orientation';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TickInfo, AxisViewModel } from '../axis-view-model';

@Injectable({ providedIn: 'root' })
export class TimeAxisService {
  vm$ = combineLatest([
    this.scaleTimeService.scaleTime$,
    this.optionsService.orientation$
  ]).pipe(
    map(
      ([scaleTime, orientation]): AxisViewModel =>
        this.getTimeAxisViewModel(scaleTime(orientation), orientation)
    )
  );

  constructor(
    private scaleTimeService: ScaleTimeService,
    private optionsService: OptionsService
  ) {}

  private getTimeAxisViewModel(
    scaleTime: ScaleTime<number, number>,
    orientation: Orientation
  ): AxisViewModel {
    return {
      tickInfos: this.getTickInfos(scaleTime, orientation),
      axisLine: { x1: 0, y1: 0, x2: 0, y2: scaleTime.range()[1] }
    };
  }

  private getTickInfos(
    scaleTime: ScaleTime<number, number>,
    orientation: Orientation
  ): TickInfo[] {
    return scaleTime.ticks().map(tick => ({
      label: scaleTime.tickFormat()(tick),
      transform: this.tickTransform(scaleTime, orientation, tick)
    }));
  }

  private tickTransform(
    scale: ScaleTime<number, number>,
    orientation: Orientation,
    tick: Date
  ) {
    return orientation === Orientation.Vertical
      ? `translate(0,${scale(tick)})`
      : `translate(${scale(tick)}, 0)`;
  }
}
