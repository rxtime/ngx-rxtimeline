import { BandScale } from '../scales/scale-types';
import { ResourceRectangle } from './resource-rectangle';
import { pointToTransform } from '../core/point';
import { View } from '../view/view';

// TODO: Orientation #373
export function getResourceRectangles(
  scale: BandScale,
  view: View,
  width: number,
  height: number
): ResourceRectangle[] {
  return scale.domain().map(resource => ({
    id: resource,
    width,
    height,
    transform: pointToTransform({ x: scale(resource), y: view.top })
  }));
}
