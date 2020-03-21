import { TimeScale, BandScale, InverseBandScale } from './scale-types';
import { Orientation } from './core/orientation';
import { scaleBand, scaleTime } from 'd3-scale';
import { Activity } from './activity/activity';
import { min, max } from 'd3-array';
import { View } from './view/view';

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
  activities: Activity[],
  view: View,
  timeOrientation: Orientation,
  event: any
): TimeScale {
  const unscaledTimeScale = configureTimeScale(
    activities,
    view,
    timeOrientation
  );

  return event
    ? timeOrientation === Orientation.Vertical
      ? event.transform.rescaleY(unscaledTimeScale)
      : event.transform.rescaleX(unscaledTimeScale)
    : unscaledTimeScale;
}

export function configureBandScale(
  activities: Activity[],
  view: View,
  orientation: Orientation
): BandScale {
  return scaleBand()
    .domain(getBandScaleDomain(activities))
    .range(getRange(view, orientation));
}

export function configureTimeScale(
  activities: Activity[],
  view: View,
  orientation: Orientation
): TimeScale {
  return scaleTime()
    .domain(getTimeScaleDomain(activities))
    .range(getRange(view, orientation));
}

function getBandScaleDomain(activities: Activity[]): string[] {
  return [...new Set(activities.map(activity => activity.resource))];
}

function getTimeScaleDomain(activities: Activity[]): [Date, Date] {
  return [
    min(activities, activity => activity.start),
    max(activities, activity => activity.finish)
  ];
}

function getRange(view: View, orientation: Orientation): [number, number] {
  return orientation === Orientation.Vertical
    ? [view.top, view.bottom]
    : [view.left, view.right];
}
