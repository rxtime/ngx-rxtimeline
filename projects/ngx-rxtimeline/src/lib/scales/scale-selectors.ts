import { createSelector } from '../store-lib/selector/create-selector';
import { selectPositionedActivities, selectZoomEvent } from '../store/state';
import {
  selectTimeOrientation,
  selectAxisOrientation
} from '../options/selectors/options.selectors';
import { selectResourceGap } from '../options/selectors/resource-options.selectors';
import {
  createStructuredSelector,
  createEnumSelector
} from '../store-lib/selector/selector-utils';
import { Activity } from '../../public-api';
import { Orientation } from '../core/orientation';
import { TimeScale, BandScale, Scale } from './scale-types';
import { scaleBand, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import {
  selectViewHorizontalRange,
  selectViewVerticalRange
} from '../view/view.selectors';
import { OrientedScale } from './oriented-scale';
import { AxisType } from '../axis/axis';
import { constSelector } from '../store-lib/selector/selector';

const createSelectScaleRange = (axisType: AxisType) =>
  createEnumSelector<Orientation, number[]>({
    Vertical: selectViewVerticalRange,
    Horizontal: selectViewHorizontalRange
  })(selectAxisOrientation(axisType));

const selectBandScaleDomain = createSelector(
  selectPositionedActivities,
  getBandScaleDomain
);

function getBandScaleDomain(activities: Activity[]): string[] {
  return [...new Set(activities.map(activity => activity.resource))];
}

export const selectBandScale = createSelector(
  selectBandScaleDomain,
  createSelectScaleRange(AxisType.Resources),
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
  createSelectScaleRange(AxisType.Time),
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

const selectRescaledTimeScale = createEnumSelector<Orientation, TimeScale>({
  Horizontal: selectTimeScaleRescaledX,
  Vertical: selectTimeScaleRescaledY
})(selectTimeOrientation);

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

const selectScale = (axisType: AxisType) =>
  createEnumSelector<AxisType, Scale>({
    Resources: selectBandScale,
    Time: selectTimeScale
  })(constSelector(axisType));

export const selectOrientedScale = (axisType: AxisType) =>
  createStructuredSelector<OrientedScale<Scale>>({
    orientation: selectAxisOrientation(axisType),
    scale: selectScale(axisType)
  });

export const selectBandScaleWidth = createSelector(selectBandScale, scale =>
  scale.bandwidth()
);

export const selectResources = createSelector(selectBandScale, scale =>
  scale.domain()
);
