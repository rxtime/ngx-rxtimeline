import { TimeScale, BandScale, InverseBandScale } from './scale-types';
import { Orientation } from './orientation';
import { scaleBand, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { TimelineView } from './view/timeline-view';
import { DraggedTimelineEvent } from './store/dragged-timeline-event';

export function getInverseBandScale(scale: BandScale): InverseBandScale {
  const domain = scale.domain();
  const paddingOuter = scale(domain[0]);
  const eachBand = scale.step();
  return (value: number) => {
    const index = Math.floor((value - paddingOuter) / eachBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
}

export function rescaleTime(
  data: DraggedTimelineEvent[],
  view: TimelineView,
  timeOrientation: Orientation,
  event: any
): TimeScale {
  const unscaledTimeScale = configureTimeScale(data, view, timeOrientation);

  return event
    ? timeOrientation === Orientation.Vertical
      ? event.transform.rescaleY(unscaledTimeScale)
      : event.transform.rescaleX(unscaledTimeScale)
    : unscaledTimeScale;
}

export function configureBandScale(
  data: DraggedTimelineEvent[],
  view: TimelineView,
  orientation: Orientation
): BandScale {
  return scaleBand()
    .domain(getBandScaleDomain(data))
    .range(getRange(view, orientation));
}

export function configureTimeScale(
  data: DraggedTimelineEvent[],
  view: TimelineView,
  orientation: Orientation
): TimeScale {
  return scaleTime()
    .domain(getTimeScaleDomain(data))
    .range(getRange(view, orientation));
}

function getBandScaleDomain(data: DraggedTimelineEvent[]): string[] {
  return [...new Set(data.map(d => d.series))];
}

function getTimeScaleDomain(data: DraggedTimelineEvent[]): [Date, Date] {
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
