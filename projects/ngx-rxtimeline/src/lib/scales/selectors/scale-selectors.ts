import { AxisType } from '../../axis/axis';
import { Scale } from '../scale-types';
import {
  createEnumSelector,
  createStructuredSelector
} from '../../store-lib/selector/selector-utils';
import { constSelector } from '../../store-lib/selector/selector';
import { OrientedScale } from '../oriented-scale';
import { selectAxisOrientation } from '../../options/selectors/options.selectors';
import { selectBandScale } from './band-scale.selectors';
import { selectTimeScale } from './time-scale.selectors';

export const selectScale = (axisType: AxisType) =>
  createEnumSelector<AxisType, Scale>({
    Resources: selectBandScale,
    Time: selectTimeScale
  })(constSelector(axisType));

export const selectOrientedScale = (axisType: AxisType) =>
  createStructuredSelector<OrientedScale<Scale>>({
    orientation: selectAxisOrientation(axisType),
    scale: selectScale(axisType)
  });
