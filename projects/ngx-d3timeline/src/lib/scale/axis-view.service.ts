import { Injectable } from '@angular/core';
import { OptionsService } from '../options.service';
import { ScaleTime, ScaleBand } from 'd3-scale';
import { Orientation } from '../orientation';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TickInfo, AxisViewModel } from './axis-view-model';
import { EventService } from '../event.service';
import { ScaleService } from '../scale/scale-service';

@Injectable({ providedIn: 'root' })
export class AxisViewService {
  timeAxisVm$ = combineLatest([
    this.scaleService.scaleTime$,
    this.optionsService.orientation$,
    this.eventService.event$
  ]).pipe(
    map(
      ([scaleTime, orientation, event]): AxisViewModel =>
        this.getAxisViewModel(
          this.getScaleTime(scaleTime, orientation, event),
          orientation
        )
    )
  );

  resourceAxisVm$ = combineLatest([
    this.scaleService.scaleBand$,
    this.optionsService.orientation$
  ]).pipe(
    map(
      ([scaleBand, orientation]): AxisViewModel =>
        this.getAxisViewModel(scaleBand(orientation), orientation)
    )
  );

  constructor(
    private scaleService: ScaleService,
    private optionsService: OptionsService,
    private eventService: EventService
  ) {}

  private getScaleTime(
    scaleTime: (orientation: Orientation) => ScaleTime<number, number>,
    orientation: Orientation,
    event: any
  ) {
    const scale = scaleTime(orientation);

    return event
      ? this.eventService.getTransformedScale(scale, event, orientation)
      : scale;
  }

  private getAxisViewModel(
    scale: ScaleTime<number, number> | ScaleBand<string>,
    orientation: Orientation
  ): AxisViewModel {
    return {
      tickInfos: this.getTickInfos(scale, orientation),
      axisLine: { x1: 0, y1: 0, x2: 0, y2: scale.range()[1] }
    };
  }

  private getTickInfos(
    scale: ScaleTime<number, number> | ScaleBand<string>,
    orientation: Orientation
  ): TickInfo[] {
    return this.getTicks(scale).map(tick => ({
      label: this.getLabel(scale, tick),
      transform: this.optionsService.tickTransform(scale(tick), orientation)
    }));
  }

  private getLabel(
    scale: ScaleTime<number, number> | ScaleBand<string>,
    tick: any
  ): string {
    return this.isScaleTime(scale) ? scale.tickFormat()(tick) : tick;
  }

  private getTicks(
    scale: ScaleTime<number, number> | ScaleBand<string>
  ): any[] {
    return this.isScaleTime(scale) ? scale.ticks() : scale.domain();
  }

  private isScaleTime(
    scale: ScaleTime<number, number> | ScaleBand<string>
  ): scale is ScaleTime<number, number> {
    return (scale as ScaleTime<number, number>).ticks !== undefined;
  }
}
