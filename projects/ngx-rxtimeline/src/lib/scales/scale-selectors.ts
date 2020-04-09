import { createSelector } from '../store-lib/selector/create-selector';
import { selectPositionedActivities, selectZoomEvent } from '../store/state';
import {
  selectResourceOrientation,
  selectTimeOrientation
} from '../options/selectors/options.selectors';
import { selectResourceGap } from '../options/selectors/resource-options.selectors';
import { getOrientedScale } from './oriented-scale';
import { Activity } from '../../public-api';
import { Orientation, EitherOnOrientation } from '../core/orientation';
import { TimeScale, BandScale } from './scale-types';
import { scaleBand, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import {
  selectViewHorizontalRange,
  selectViewVerticalRange
} from '../view/view.selectors';
import { MemoizedSelector } from '../store-lib/selector/memoized-selector';

const createSelectScaleRange = (
  selectOrientation: MemoizedSelector<Orientation>
) =>
  createSelector(
    selectOrientation,
    selectViewVerticalRange,
    selectViewHorizontalRange,
    EitherOnOrientation
  );

const selectBandScaleDomain = createSelector(
  selectPositionedActivities,
  getBandScaleDomain
);

function getBandScaleDomain(activities: Activity[]): string[] {
  return [...new Set(activities.map(activity => activity.resource))];
}

export const selectBandScale = createSelector(
  selectBandScaleDomain,
  createSelectScaleRange(selectResourceOrientation),
  selectResourceGap,
  getBandScale
);

function getBandScale(
  domain: string[],
  range: [number, number],
  resourceGap: number
): BandScale {
  return scaleBand()
    .domain(domain)
    .range(range)
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
  createSelectScaleRange(selectTimeOrientation),
  getTimeScale
);

function getTimeScale(
  domain: [Date, Date],
  range: [number, number]
): TimeScale {
  return scaleTime()
    .domain(domain)
    .range(range);
}

const selectTimeScaleRescaledY = createSelector(
  selectZoomEvent,
  selectUnscaledTimeScale,
  getTimeScaleRescaledY
);

function getTimeScaleRescaledY(event: any, unscaledTimeScale: TimeScale) {
  return event && event.transform.rescaleY(unscaledTimeScale);
}

const selectTimeScaleRescaledX = createSelector(
  selectZoomEvent,
  selectUnscaledTimeScale,
  getTimeScaleRescaledX
);

function getTimeScaleRescaledX(event: any, unscaledTimeScale: TimeScale) {
  return event && event.transform.rescaleX(unscaledTimeScale);
}

const selectRescaledTimeScale = createSelector(
  selectTimeOrientation,
  selectTimeScaleRescaledY,
  selectTimeScaleRescaledX,
  EitherOnOrientation
);

export const selectTimeScale = createSelector(
  selectUnscaledTimeScale,
  selectRescaledTimeScale,
  rescaleTime
);

function rescaleTime(
  unscaledTimeScale: TimeScale,
  rescaledTimeScale: TimeScale
): TimeScale {
  return rescaledTimeScale || unscaledTimeScale;
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