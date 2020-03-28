import { createSelector } from '../store-lib/selector/create-selector';
import {
  selectPositionedActivities,
  selectView,
  selectZoomEvent
} from '../store/state'; // TODO use barelling?
import {
  selectResourceOrientation,
  selectTimeOrientation
} from '../options/selectors/options.selectors';
import { selectResourceGap } from '../options/selectors/resource-options.selectors';
import { getOrientedScale } from './oriented-scale';
import { Activity } from '../../public-api';
import { View } from '../view/view';
import { Orientation } from '../core/orientation';
import { TimeScale, BandScale } from './scale-types';
import { scaleBand, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';

export const selectBandScale = createSelector(
  selectPositionedActivities,
  selectView,
  selectResourceOrientation,
  selectResourceGap,
  configureBandScale
);

function configureBandScale(
  activities: Activity[],
  view: View,
  orientation: Orientation,
  resourceGap: number
): BandScale {
  return scaleBand()
    .domain(getBandScaleDomain(activities))
    .range(getRange(view, orientation))
    .paddingInner(resourceGap);
}

function getBandScaleDomain(activities: Activity[]): string[] {
  return [...new Set(activities.map(activity => activity.resource))];
}

export const selectBandScaleWidth = createSelector(selectBandScale, scale =>
  scale.bandwidth()
);

export const selectTimeScale = createSelector(
  selectPositionedActivities,
  selectView,
  selectTimeOrientation,
  selectZoomEvent,
  rescaleTime
);

function rescaleTime(
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

function configureTimeScale(
  activities: Activity[],
  view: View,
  orientation: Orientation
): TimeScale {
  return scaleTime()
    .domain(getTimeScaleDomain(activities))
    .range(getRange(view, orientation));
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

export const selectOrientedTimeScale = createSelector(
  selectTimeScale,
  selectTimeOrientation,
  getOrientedScale
);

export const selectOrientedBandScale = createSelector(
  selectBandScale,
  selectResourceOrientation,
  getOrientedScale
);
