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
import { Scale, BandScale } from '../scale-types';
import { ResourceAxisTickRenderer } from './resources-axis/resource-axis-tick-renderer';
import { TimeAxisTickRenderer } from './time-axis/time-axis-tick-renderer';
import { TickRenderer } from './tick-renderer';
import { State } from '../store/state';
import { TimelineEvent } from '../timeline-event';
import { scaleBand } from 'd3-scale';

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

let lastData = null;
let lastView = null;
let lastOrientation = null;
let lastResult = null;

function selectBandScale(state: State) {
  const [data, view, orientation] = [
    selectData(state),
    selectView(state),
    selectResourceOrientation(state)
  ];

  if (
    data !== lastData ||
    view !== lastView ||
    orientation !== lastOrientation
  ) {
    [lastData, lastView, lastOrientation] = [data, view, orientation];
    lastResult = configureBandScale2(data, view, orientation);
    console.log('new band scale created');
  }

  console.log('band scale selected');
  return lastResult;
}

const selectResourceOrientation = (state: State) => Orientation.Horizontal; // temp as orientation not populated in store
const selectView = (state: State) => state.view;
const selectData = (state: State) => state.data;

// ---------------------temp code copied fom scale service ------------------------------
function configureBandScale2(
  data: TimelineEvent[],
  view: TimelineView,
  resourceOrientation: Orientation
): BandScale {
  return scaleBand()
    .domain(getBandScaleDomain(data))
    .range(getRange(view, resourceOrientation));
}

function getBandScaleDomain(data: TimelineEvent[]): string[] {
  return [...new Set(data.map(d => d.series))];
}

function getRange(
  view: TimelineView,
  orientation: Orientation
): [number, number] {
  return orientation === Orientation.Vertical
    ? [view.top, view.bottom]
    : [view.left, view.right];
}

// ---------------------temp code copied fom scale service ------------------------------
