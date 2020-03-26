import { BandScale } from '../scales/scale-types';
import { ResourceRectangle } from './resource-rectangle';
import { pointToTransform } from '../core/point';
import { View } from '../view/view';

// TODO: Orientation #373
export function getResourceRectangles(
  scale: BandScale,
  view: View,
  resourceFontSize: number,
  width: number,
  clipRectangleHeight: number
): ResourceRectangle[] {
  return scale.domain().map(resource => ({
    id: resource,
    width,
    height: clipRectangleHeight + resourceFontSize,
    transform: pointToTransform({
      x: scale(resource),
      y: view.top - resourceFontSize
    })
  }));
}
