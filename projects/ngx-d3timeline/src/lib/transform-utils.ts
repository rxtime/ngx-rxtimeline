import { TimelineView } from './view/timeline-view';
import { Orientation } from './orientation';

// TODO probably could be better named
export function getTransformToShiftInOrientationAxis(
  timelineView: TimelineView,
  orientation: Orientation,
  distance: number
) {
  return orientation === Orientation.Vertical
    ? `translate(${timelineView.left}, ${distance})`
    : `translate(${distance}, ${timelineView.top})`;
}
