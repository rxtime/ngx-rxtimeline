import { createSelector } from '../../store-lib/selector/create-selector';
import { selectBandScale } from '../../scales/scale-selectors';
import { BandScale } from '../../scales/scale-types';
import { ResourceRectangle } from '../resource-rectangle';
import { pointToTransform, Point } from '../../core/point';
import {
  selectRectWidth,
  selectResourceRectHeight,
  selectTickRectHeight
} from './resource-rectangle-size.selectors';
import { selectResourceRectangleTopLeft } from './resource-rectangle-position.selectors';

export const selectResourceTickMarkRectangles = createSelector(
  selectBandScale,
  selectRectWidth,
  selectTickRectHeight,
  selectResourceRectangleTopLeft,
  getResourceRectangles
);

export const selectResourceRectangles = createSelector(
  selectBandScale,
  selectRectWidth,
  selectResourceRectHeight,
  selectResourceRectangleTopLeft,
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
