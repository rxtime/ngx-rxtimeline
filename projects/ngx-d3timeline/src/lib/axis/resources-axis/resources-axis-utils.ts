import { TimelineView } from '../../view/timeline-view';
import { Orientation } from '../../orientation';
import { BandScale } from '../../scale-types';
import { ResourceAxisTickRenderer } from './resource-axis-tick-renderer';
import { createSelector } from '../../selector/memoized-selector';
import { selectView, selectResourceOrientation } from '../../store/state';
import { selectBandScale } from '../../store/timeline-selectors';
import { createAxis } from '../axis-utils';

function createResourceAxis(
  view: TimelineView,
  orientation: Orientation,
  bandScale: BandScale
) {
  return createAxis(
    view,
    orientation,
    bandScale,
    new ResourceAxisTickRenderer()
  );
}

export const selectResourceAxis = createSelector(
  [selectView, selectResourceOrientation, selectBandScale],
  createResourceAxis
);
