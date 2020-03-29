import { createSelector } from '../store-lib/selector/create-selector';
import { selectBandScale } from '../scales/scale-selectors';
import { BandScale } from '../scales/scale-types';
import { ResourceRectangle } from './resource-rectangle';
import { pointToTransform, Point } from '../core/point';
import { selectTimeOrientation } from '../options/selectors/options.selectors';
import { Orientation } from '../core/orientation';
import {
  selectRectWidth,
  selectRectHeight
} from './resource-rectangle-size.selectors';
import { selectResourceRectangleTopLeft } from './resource-rectangle-position.selectors';

// This could be better, tidy up as part of #373
export const selectResourceRectangles = createSelector(
  selectBandScale,
  selectRectWidth,
  selectRectHeight,
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
