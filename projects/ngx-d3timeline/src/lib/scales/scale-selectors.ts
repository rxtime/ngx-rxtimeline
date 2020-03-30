import { createSelector } from '../store-lib/selector/create-selector';
import {
  selectPositionedActivities,
  selectView,
  selectZoomEvent
} from '../store/state';
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
import { partialApply } from '../core/function-utils';

const selectScaleRange = createSelector(selectView, partialApply(getRange));

function getRange(orientation: Orientation, view: View): [number, number] {
  return orientation === Orientation.Vertical
    ? [view.top, view.bottom]
    : [view.left, view.right];
}

const selectBandScaleDomain = createSelector(
  selectPositionedActivities,
  getBandScaleDomain
);

function getBandScaleDomain(activities: Activity[]): string[] {
  return [...new Set(activities.map(activity => activity.resource))];
}

export const selectBandScale = createSelector(
  selectBandScaleDomain,
  selectScaleRange,
  selectResourceOrientation,
  selectResourceGap,
  getBandScale
);

function getBandScale(
  domain: string[],
  range: (o: Orientation) => [number, number],
  orientation: Orientation,
  resourceGap: number
): BandScale {
  return scaleBand()
    .domain(domain)
    .range(range(orientation))
    .paddingInner(resourceGap);
}

const selectTimeScaleDomain = createSelector(
  selectPositionedActivities,
  getTimeScaleDomain
);

function getTimeScaleDomain(activities: Activity[]): [Date, Date] {
  return [
    min(activities, activity => activity.start),
    max(activities, activity => activity.finish)
  ];
}

const selectUnscaledTimeScale = createSelector(
  selectTimeScaleDomain,
  selectScaleRange,
  selectTimeOrientation,
  getTimeScale
);

function getTimeScale(
  domain: [Date, Date],
  range: (o: Orientation) => [number, number],
  orientation: Orientation
): TimeScale {
  return scaleTime()
    .domain(domain)
    .range(range(orientation));
}

export const selectTimeScale = createSelector(
  selectUnscaledTimeScale,
  selectTimeOrientation,
  selectZoomEvent,
  rescaleTime
);

function rescaleTime(
  unscaledTimeScale: TimeScale,
  timeOrientation: Orientation,
  event: any
): TimeScale {
  return event
    ? timeOrientation === Orientation.Vertical
      ? event.transform.rescaleY(unscaledTimeScale)
      : event.transform.rescaleX(unscaledTimeScale)
    : unscaledTimeScale;
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

export const selectBandScaleWidth = createSelector(selectBandScale, scale =>
  scale.bandwidth()
);

export const selectResources = createSelector(selectBandScale, scale =>
  scale.domain()
);
