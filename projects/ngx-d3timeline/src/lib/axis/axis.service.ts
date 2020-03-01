import { Axis } from './axis';
import { Orientation } from '../orientation';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { Tick } from './tick';
import { Line } from './line';
import { Store } from '../store/store';
import { OptionsService } from '../options.service';
import { TimelineView } from '../view/timeline-view';
import { Scale, BandScale, TimeScale } from '../scale-types';
import { ResourceAxisTickRenderer } from './resources-axis/resource-axis-tick-renderer';
import { TimeAxisTickRenderer } from './time-axis/time-axis-tick-renderer';
import { TickRenderer } from './tick-renderer';
import { State } from '../store/state';
import { createSliceSelector } from '../store/slice-selector';
import { createSelector } from '../store/memoized-selector';
import { configureBandScale, configureTimeScale } from '../scale-utils';

@Injectable({ providedIn: 'root' })
export class AxisService {
  resourceAxis$ = combineLatest([
    this.store.select(selectBandScale),
    this.store.select(selectResourceOrientation),
    this.store.select(selectView)
  ]).pipe(
    map(([bandScale, orientation, view]) =>
      this.createAxis(
        new ResourceAxisTickRenderer(),
        bandScale,
        orientation,
        view
      )
    )
  );

  timeAxis$ = combineLatest([
    this.store.select(selectTimeScale),
    this.store.select(selectTimeOrientation),
    this.store.select(selectView)
  ]).pipe(
    map(([timeScale, orientation, view]) =>
      this.createAxis(new TimeAxisTickRenderer(), timeScale, orientation, view)
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
      axisLine: this.getAxisLine(scale, orientation, timelineView)
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

  private getAxisLine<TScale extends Scale>(
    scale: TScale,
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

const selectTimeOrientation = createSliceSelector(
  (state: State) => Orientation.Vertical
); // temp as orientation not populated in store
const selectResourceOrientation = createSliceSelector(
  (state: State) => Orientation.Horizontal
); // temp as orientation not populated in store
const selectView = createSliceSelector((state: State) => state.view);
const selectData = createSliceSelector((state: State) => state.data);

const selectBandScale = createSelector(
  [selectData, selectView, selectResourceOrientation],
  configureBandScale
);

const selectTimeScale = createSelector(
  [selectData, selectView, selectResourceOrientation],
  configureTimeScale
);
