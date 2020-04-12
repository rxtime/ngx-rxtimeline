import { createSelector } from '../../store-lib/selector/create-selector';
import { selectBandScale } from '../../scales/selectors/band-scale.selectors';
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
import { selectSelectedId, selectHoveredId } from '../../store/state';
import { Identifier } from '../../core/identifiable';
import { PositionedActivity } from '../../activity/positioned-activity';
import {
  selectSelectedActivity,
  selectHoveredActivity
} from '../../activity/activity.selectors';

const selectSelectedResource = createSelector(
  selectSelectedId,
  selectSelectedActivity,
  getResource
);

const selectHoveredResource = createSelector(
  selectHoveredId,
  selectHoveredActivity,
  getResource
);

function getResource(id: Identifier, activity: PositionedActivity): string {
  return (activity && activity.updatedResource) || (id as string);
}

export const selectResourceTickRectangles = createSelector(
  selectBandScale,
  selectTickRectWidth,
  selectTickRectHeight,
  selectTickRectTopLeft,
  selectSelectedResource,
  selectHoveredResource,
  getResourceRectangles
);

export const selectResourceRectangles = createSelector(
  selectBandScale,
  selectResourceRectWidth,
  selectResourceRectHeight,
  selectResourceRectTopLeft,
  selectSelectedResource,
  selectHoveredResource,
  getResourceRectangles
);

function getResourceRectangles(
  scale: BandScale,
  width: number,
  height: number,
  rectTopLeft: (resource: string) => Point,
  selectedId: string,
  hoveredId: string
): ResourceRectangle[] {
  return scale.domain().map(resource => ({
    id: resource,
    width,
    height,
    transform: pointToTransform(rectTopLeft(resource)),
    selected: selectedId === resource,
    hovered: hoveredId === resource
  }));
}
