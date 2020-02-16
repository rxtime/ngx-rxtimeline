import { Injectable } from '@angular/core';
import { ScaleTimeService } from '../scale/scale-time.service';
import { OptionsService } from '../options.service';
import { ScaleTime } from 'd3-scale';
import { Orientation } from '../orientation';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TickInfo, AxisViewModel } from '../axis-view-model';
import { EventService } from '../event.service';

@Injectable({ providedIn: 'root' })
export class TimeAxisService {
  vm$ = combineLatest([
    this.scaleTimeService.scaleTime$,
    this.optionsService.orientation$,
    this.eventService.event$
  ]).pipe(
    map(
      ([scaleTime, orientation, event]): AxisViewModel =>
        this.getTimeAxisViewModel(
          this.getScaleTime(scaleTime, orientation, event),
          orientation
        )
    )
  );

  constructor(
    private scaleTimeService: ScaleTimeService,
    private optionsService: OptionsService,
    private eventService: EventService
  ) {}

  private getScaleTime(
    scaleTime: (orientation: Orientation) => ScaleTime<number, number>,
    orientation: Orientation,
    event: any
  ) {
    const scale = scaleTime(orientation);

    return event ? this.getTransformedScale(scale, event, orientation) : scale;
  }

  private getTransformedScale(
    scale: ScaleTime<number, number>,
    event: any,
    orientation: Orientation
  ) {
    return orientation === Orientation.Vertical
      ? event.transform.rescaleY(scale)
      : event.transform.rescaleX(scale);
  }

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
