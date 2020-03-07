import { TimelineView } from '../../view/timeline-view';
import { Orientation } from '../../orientation';
import { TimeScale } from '../../scale-types';
import { TimeAxisTickRenderer } from './time-axis-tick-renderer';
import { createSelector } from '../../selector/memoized-selector';
import { selectView, selectTimeOrientation } from '../../store/state';
import { selectTimeScale } from '../../store/timeline-selectors';
import { createAxis } from '../axis-utils';

export function createTimeAxis(
  view: TimelineView,
  orientation: Orientation,
  timeScale: TimeScale
) {
  return createAxis(view, orientation, timeScale, new TimeAxisTickRenderer());
}

export const selectTimeAxis = createSelector(
  [selectView, selectTimeOrientation, selectTimeScale],
  createTimeAxis
);
