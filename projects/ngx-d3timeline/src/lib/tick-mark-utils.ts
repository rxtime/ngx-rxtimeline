import { Orientation } from './orientation';
import { TimelineView } from './view/timeline-view';
import { createOrientedLine } from './axis/line';
import { origin, Point } from './point';

export function getTickMarkTranslation(
  range: number,
  orientation: Orientation,
  timelineView: TimelineView
) {
  return orientation === Orientation.Vertical
    ? `translate(${timelineView.left}, ${range})`
    : `translate(${range}, ${timelineView.top})`;
}

export function getTickLine(lineOffset: number, orientation: Orientation) {
  return lineOffset && createOrientedLine(origin, lineOffset, orientation);
}

export function getTickLabelOffset(
  labelSpacing: number,
  orientation: Orientation
): Point {
  return orientation === Orientation.Vertical
    ? { ...origin, y: labelSpacing }
    : { ...origin, x: labelSpacing };
}
