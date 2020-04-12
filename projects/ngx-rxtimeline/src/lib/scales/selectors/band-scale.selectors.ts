import { selectPositionedActivities } from '../../store/state';
import { createSelector } from '../../store-lib/selector/create-selector';
import { Activity } from '../../activity/activity';
import { selectViewRange } from '../../view/view.selectors';
import { AxisType } from '../../axis/axis';
import { selectResourceGap } from '../../options/selectors/resource-options.selectors';
import { BandScale } from '../scale-types';
import { scaleBand } from 'd3-scale';

const selectBandScaleDomain = createSelector(
  selectPositionedActivities,
  getBandScaleDomain
);

function getBandScaleDomain(activities: Activity[]): string[] {
  return [...new Set(activities.map(activity => activity.resource))];
}

export const selectBandScale = createSelector(
  selectBandScaleDomain,
  selectViewRange(AxisType.Resources),
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

export const selectBandScaleWidth = createSelector(selectBandScale, scale =>
  scale.bandwidth()
);

export const selectResources = createSelector(selectBandScale, scale =>
  scale.domain()
);
