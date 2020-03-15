import { Orientation } from './orientation';
import { TimelineView } from './view/timeline-view';
import { createOrientedLine } from './axis/line';
import { origin, Point } from './point';
import { pointToTransform } from './transform-utils';

export function getTickMarkTranslation(
  range: number,
  orientation: Orientation,
  timelineView: TimelineView
) {
  return pointToTransform(getTickMarkTopLeft(range, orientation, timelineView));
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

function getTickMarkTopLeft(
  range: number,
  orientation: Orientation,
  timelineView: TimelineView
): Point {
  return orientation === Orientation.Vertical
    ? { x: timelineView.left, y: range }
    : { x: range, y: timelineView.top };
}
