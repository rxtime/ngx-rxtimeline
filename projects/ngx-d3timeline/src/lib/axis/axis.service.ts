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
import { ResourceAxisTickRenderer } from './resources-axis/resource-axis-tick-renderer';
import { TimeAxisTickRenderer } from './time-axis/time-axis-tick-renderer';
import { TickRenderer } from './tick-renderer';

@Injectable({ providedIn: 'root' })
export class AxisService {
  resourceAxis$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxis(
        new ResourceAxisTickRenderer(scales.scaleBand),
        scales.state.axisOrientations.resourceOrientation,
        scales.state.view
      )
    )
  );

  timeAxis$ = this.scalesService.scales$.pipe(
    map(scales =>
      this.createAxis(
        new TimeAxisTickRenderer(scales.scaleTime),
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
    tickRenderer: TickRenderer,
    orientation: Orientation,
    timelineView: TimelineView
  ): Axis {
    return {
      ticks: this.getTicks(tickRenderer, orientation, timelineView),
      axisLine: this.getAxisLine(tickRenderer, orientation, timelineView)
    };
  }

  private getTicks(
    tickRenderer: TickRenderer,
    orientation: Orientation,
    timelineView: TimelineView
  ): Tick[] {
    return tickRenderer.getTickValues().map(value => ({
      label: tickRenderer.getLabel(value),
      transform: this.optionsService.getTranslation(
        tickRenderer.getTransform(value),
        orientation,
        timelineView
      )
    }));
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
