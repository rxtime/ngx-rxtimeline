import { Axis } from './axis';
import { Orientation } from '../orientation';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TickMark } from './tick-mark';
import { Line } from './line';
import { Store } from '../store/store';
import { TimelineView } from '../view/timeline-view';
import { Scale } from '../scale-types';
import { ResourceAxisTickMarkRenderer } from './resources-axis/resource-axis-tick-mark-renderer';
import { TimeAxisTickMarkRenderer } from './time-axis/time-axis-tick-mark-renderer';
import { TickMarkRenderer } from './tick-mark-renderer';
import { flipOrientation } from '../orientation-utils';
import { createSelector } from '../selector/create-selector';
import { selectBandScale, selectTimeScale } from '../store/timeline-selectors';
import {
  selectTimeOrientation,
  selectResourceOrientation,
  selectView
} from '../store/state';
import * as fromTickMarkUtils from '../tick-mark-utils';

const tempSelectResourceAxis = createSelector(
  selectBandScale,
  selectResourceOrientation,
  selectView,
  (bandScale, orientation, view) => ({
    bandScale,
    orientation,
    view
  })
);

const tempSelectTimeAxis = createSelector(
  selectTimeScale,
  selectTimeOrientation,
  selectView,
  (timeScale, orientation, view) => ({
    timeScale,
    orientation,
    view
  })
);

@Injectable({ providedIn: 'root' })
export class AxisService {
  resourceAxis$ = this.store
    .select(tempSelectResourceAxis)
    .pipe(
      map(resourceAxisArgs =>
        this.createAxis(
          new ResourceAxisTickMarkRenderer(),
          resourceAxisArgs.bandScale,
          resourceAxisArgs.orientation,
          resourceAxisArgs.view
        )
      )
    );

  timeAxis$ = this.store
    .select(tempSelectTimeAxis)
    .pipe(
      map(timeAxisArgs =>
        this.createAxis(
          new TimeAxisTickMarkRenderer(),
          timeAxisArgs.timeScale,
          timeAxisArgs.orientation,
          timeAxisArgs.view
        )
      )
    );

  constructor(private store: Store) {}

  private createAxis<TScale extends Scale>(
    tickMarkRenderer: TickMarkRenderer<TScale>,
    scale: TScale,
    orientation: Orientation,
    timelineView: TimelineView
  ): Axis {
    return {
      tickMarks: this.getTickMarks(
        tickMarkRenderer,
        scale,
        orientation,
        timelineView
      ),
      line: this.getLine(scale, orientation, timelineView)
    };
  }

  private getTickMarks<TScale extends Scale>(
    tickMarkRenderer: TickMarkRenderer<TScale>,
    scale: TScale,
    orientation: Orientation,
    timelineView: TimelineView
  ): TickMark[] {
    return tickMarkRenderer.getTickValues(scale).map(value => ({
      label: tickMarkRenderer.getTickLabel(scale, value),
      labelOffset: fromTickMarkUtils.getTickLabelOffset(
        tickMarkRenderer.getTickLabelSpacing(),
        flipOrientation(orientation)
      ),
      transform: fromTickMarkUtils.getTranslation(
        tickMarkRenderer.getTransform(scale, value),
        orientation,
        timelineView
      ),
      line: fromTickMarkUtils.getTickLine(
        tickMarkRenderer.getTickLineOffset(),
        flipOrientation(orientation)
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
