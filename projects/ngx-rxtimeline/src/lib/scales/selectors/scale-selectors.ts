import { AxisType } from '../../axis/axis';
import { Scale, BandScale } from '../scale-types';
import {
  createOptionsBasedSelector,
  createStructuredSelector
} from '../../store-lib/selector/selector-utils';
import { constSelector } from '../../store-lib/selector/selector';
import { OrientedScale } from '../oriented-scale';
import { selectAxisOrientation } from '../../options/selectors/options.selectors';
import { selectBandScale } from './band-scale.selectors';
import { selectTimeScale } from './time-scale.selectors';
import { createSelector } from '../../store-lib/selector/create-selector';

export const selectScale = (axisType: AxisType) =>
  createOptionsBasedSelector<AxisType, Scale>({
    Resources: selectBandScale,
    Time: selectTimeScale
  })(constSelector(axisType));

export const selectOrientedScale = (axisType: AxisType) =>
  createStructuredSelector<OrientedScale<Scale>>({
    orientation: selectAxisOrientation(axisType),
    scale: selectScale(axisType)
  });

export const selectMapTickValueToPositionInTimeScale = createSelector(
  selectTimeScale,
  mapTickValueToPositionInScale
);

function mapTickValueToPositionInBandScale(scale: BandScale) {
  return (value: string) => scale(value) + scale.bandwidth() / 2;
}

export const selectMapTickValueToPositionInBandScale = createSelector(
  selectBandScale,
  mapTickValueToPositionInBandScale
);

function mapTickValueToPositionInScale(scale: Scale): (v: any) => number {
  return (value: any) => scale(value);
}

export const selectMapTickValueToPositionInScale = (axisType: AxisType) =>
  createOptionsBasedSelector<AxisType, (v: any) => number>({
    Resources: selectMapTickValueToPositionInBandScale,
    Time: selectMapTickValueToPositionInTimeScale
  })(constSelector(axisType));
