import { createSelector } from '../../store-lib/selector/create-selector';
import { selectPositionedActivities, selectZoomEvent } from '../../store/state';
import { Activity } from '../../activity/activity';
import { selectViewRange } from '../../view/view.selectors';
import { AxisType } from '../../axis/axis';
import { TimeScale } from '../scale-types';
import { scaleTime } from 'd3-scale';
import { selectZoomEventRescale } from '../../zoom/zoom.selectors';
import { or } from '../../core/function-utils';
import { min, max } from 'd3-array';

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
  selectViewRange(AxisType.Time),
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

const selectRescaledTimeScale = createSelector(
  selectUnscaledTimeScale,
  selectZoomEventRescale,
  getTimeScaleRescaled
);

function getTimeScaleRescaled(
  unscaledTimeScale: TimeScale,
  zoomRescale: any
): TimeScale {
  return zoomRescale && zoomRescale(unscaledTimeScale);
}

export const selectTimeScale = createSelector(
  selectRescaledTimeScale,
  selectUnscaledTimeScale,
  or
);
