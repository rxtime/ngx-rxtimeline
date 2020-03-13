import { Axis } from './axis';
import { Orientation } from '../orientation';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Tick } from './tick';
import { Line } from './line';
import { Store } from '../store/store';
import { OptionsService } from '../options.service';
import { TimelineView } from '../view/timeline-view';
import { Scale } from '../scale-types';
import { ResourceAxisTickRenderer } from './resources-axis/resource-axis-tick-renderer';
import { TimeAxisTickRenderer } from './time-axis/time-axis-tick-renderer';
import { TickRenderer } from './tick-renderer';

@Injectable({ providedIn: 'root' })
export class AxisService {
  resourceAxis$ = this.store.state$.pipe(
    map(state =>
      this.createAxis(
        new ResourceAxisTickRenderer(),
        state.bandScale,
        state.axisOrientations.resource,
        state.view
      )
    )
  );

  timeAxis$ = this.store.state$.pipe(
    map(state =>
      this.createAxis(
        new TimeAxisTickRenderer(),
        state.timeScale,
        state.axisOrientations.time,
        state.view
      )
    )
  );

  constructor(private store: Store, private optionsService: OptionsService) {}

  private createAxis<TScale extends Scale>(
    tickRenderer: TickRenderer<TScale>,
    scale: TScale,
    orientation: Orientation,
    timelineView: TimelineView
  ): Axis {
    return {
      ticks: this.getTicks(tickRenderer, scale, orientation, timelineView),
      line: this.getLine(scale, orientation, timelineView)
    };
  }

  private getTicks<TScale extends Scale>(
    tickRenderer: TickRenderer<TScale>,
    scale: TScale,
    orientation: Orientation,
    timelineView: TimelineView
  ): Tick[] {
    return tickRenderer.getTickValues(scale).map(value => ({
      label: tickRenderer.getLabel(scale, value),
      transform: this.optionsService.getTranslation(
        tickRenderer.getTransform(scale, value),
        orientation,
        timelineView
      ),
      lineEnd: this.optionsService.getTickLineEnd(
        tickRenderer.getTickLineOffset(),
        orientation
      )
    }));
  }

  private getLine<TScale extends Scale>(
    scale: TScale,
    orientation: Orientation,
    timelineView: TimelineView
  ): Line {
    const line: Line = {
      x1: timelineView.left,
      x2: timelineView.left,
      y1: timelineView.top,
      y2: timelineView.top
    };
    const rangeLimit = scale.range()[1];

    return orientation === Orientation.Vertical
      ? { ...line, y2: rangeLimit }
      : { ...line, x2: rangeLimit };
  }
}
