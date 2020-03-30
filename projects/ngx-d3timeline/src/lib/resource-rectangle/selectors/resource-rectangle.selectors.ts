import { createSelector } from '../../store-lib/selector/create-selector';
import { selectBandScale } from '../../scales/scale-selectors';
import { BandScale } from '../../scales/scale-types';
import { ResourceRectangle } from '../resource-rectangle';
import { pointToTransform, Point } from '../../core/point';
import {
  selectResourceRectWidth,
  selectResourceRectHeight,
  selectTickRectHeight,
  selectTickRectWidth
} from './resource-rectangle-size.selectors';
import {
  selectResourceRectTopLeft,
  selectTickRectTopLeft
} from './resource-rectangle-position.selectors';

export const selectResourceTickRectangles = createSelector(
  selectBandScale,
  selectTickRectWidth,
  selectTickRectHeight,
  selectTickRectTopLeft,
  getResourceRectangles
);

export const selectResourceRectangles = createSelector(
  selectBandScale,
  selectResourceRectWidth,
  selectResourceRectHeight,
  selectResourceRectTopLeft,
  getResourceRectangles
);

function getResourceRectangles(
  scale: BandScale,
  width: number,
  height: number,
  rectTopLeft: (resource: string) => Point
): ResourceRectangle[] {
  return scale.domain().map(resource => ({
    id: resource,
    width,
    height,
    transform: pointToTransform(rectTopLeft(resource))
  }));
}
