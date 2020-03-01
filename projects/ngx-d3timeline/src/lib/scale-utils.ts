import { TimeScale, BandScale } from './scale-types';
import { Orientation } from './orientation';
import { scaleBand, scaleTime } from 'd3-scale';
import { TimelineEvent } from './timeline-event';
import { min, max } from 'd3-array';
import { TimelineView } from './view/timeline-view';

export function rescaleTime(
  originalTimeScale: TimeScale,
  orientation: Orientation,
  event: any
): TimeScale {
  if (event) {
    return orientation === Orientation.Vertical
      ? event.transform.rescaleY(originalTimeScale)
      : event.transform.rescaleX(originalTimeScale);
  } else {
    return originalTimeScale;
  }
}

export function configureBandScale(
  data: TimelineEvent[],
  view: TimelineView,
  orientation: Orientation
): BandScale {
  return scaleBand()
    .domain(getBandScaleDomain(data))
    .range(getRange(view, orientation));
}

export function configureTimeScale(
  data: TimelineEvent[],
  view: TimelineView,
  orientation: Orientation
): TimeScale {
  return scaleTime()
    .domain(getTimeScaleDomain(data))
    .range(getRange(view, orientation));
}

function getBandScaleDomain(data: TimelineEvent[]): string[] {
  return [...new Set(data.map(d => d.series))];
}

function getTimeScaleDomain(data: TimelineEvent[]): [Date, Date] {
  return [min(data, d => d.start), max(data, d => d.finish)];
}

function getRange(
  view: TimelineView,
  orientation: Orientation
): [number, number] {
  return orientation === Orientation.Vertical
    ? [view.top, view.bottom]
    : [view.left, view.right];
}
