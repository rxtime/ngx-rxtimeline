import { DataService } from '../../data.service';
import { OptionsService } from '../../options.service';
import { ViewService } from '../../view/view.service';
import { combineLatest } from 'rxjs';
import { AxisViewModel } from '../axis-view-model';
import { Orientation } from '../../orientation';
import { TimelineView } from '../../view/timeline-view';
import { map } from 'rxjs/operators';
import { ScaleBandService } from '../../scale-band.service';
import { ScaleBand } from 'd3-scale';
import { Injectable } from '@angular/core';
import { TimelineEvent } from '../../timeline-event';
import { TickInfo } from '../tick-info';
import { Line } from '../line';

@Injectable({ providedIn: 'root' })
export class ResourcesAxisService {
  vm$ = combineLatest([
    this.dataService.data$,
    this.optionsService.orientation$,
    this.viewService.view$
  ]).pipe(
    map(([data, orientation, view]) =>
      this.createAxisViewModel(data, orientation, view)
    )
  );

  constructor(
    private dataService: DataService,
    private optionsService: OptionsService,
    private viewService: ViewService,
    private scaleService: ScaleBandService
  ) {}

  private createAxisViewModel(
    data: TimelineEvent[],
    timelineOrientation: Orientation,
    view: TimelineView
  ): AxisViewModel {
    const orientation = this.optionsService.flipOrientation(
      timelineOrientation
    );

    const scale = this.scaleService.configureScaleBand(data, view, orientation);

    return {
      tickInfos: this.getTickInfos(scale, orientation),
      axisLine: this.getAxisLine(scale, orientation)
    };
  }

  private getTickInfos(
    scale: ScaleBand<string>,
    orientation: Orientation
  ): TickInfo[] {
    return scale.domain().map(tick => ({
      label: tick,
      transform: this.tickTransform(
        orientation,
        this.getBandMidPoint(scale, tick)
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

  private tickTransform(orientation: Orientation, range: number) {
    return orientation === Orientation.Vertical
      ? `translate(0, ${range})`
      : `translate(${range}, 0)`;
  }

  private getBandMidPoint(scale: ScaleBand<string>, tick: string) {
    return scale(tick) + scale.bandwidth() / 2;
  }
}
