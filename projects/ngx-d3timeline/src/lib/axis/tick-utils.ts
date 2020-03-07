import { Scale } from '../scale-types';
import { TickRenderer } from './tick-renderer';
import { Orientation } from '../orientation';
import { TimelineView } from '../view/timeline-view';
import { Tick } from './tick';
import { getTransformToShiftInOrientationAxis } from '../transform-utils';

function getTickLineEnd(lineOffset: number, orientation: Orientation) {
  return orientation === Orientation.Vertical
    ? { x: lineOffset, y: 0 }
    : { x: 0, y: lineOffset };
}

export function getTicks<TScale extends Scale>(
  tickRenderer: TickRenderer<TScale>,
  scale: TScale,
  orientation: Orientation,
  timelineView: TimelineView
): Tick[] {
  return tickRenderer.getTickValues(scale).map(value => ({
    label: tickRenderer.getLabel(scale, value),
    transform: getTransformToShiftInOrientationAxis(
      timelineView,
      orientation,
      tickRenderer.getTransform(scale, value)
    ),
    lineEnd: getTickLineEnd(tickRenderer.getTickLineOffset(), orientation)
  }));
}
