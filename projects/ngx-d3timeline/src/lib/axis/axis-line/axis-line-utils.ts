import { Scale } from '../../scale-types';
import { Orientation } from '../../orientation';
import { TimelineView } from '../../view/timeline-view';
import { Line } from '../line';

export function getAxisLine<TScale extends Scale>(
  scale: TScale,
  orientation: Orientation,
  timelineView: TimelineView
): Line {
  const axisLine: Line = {
    x1: timelineView.left,
    x2: timelineView.left,
    y1: timelineView.top,
    y2: timelineView.top
  };
  const rangeLimit = scale.range()[1];

  return orientation === Orientation.Vertical
    ? { ...axisLine, y2: rangeLimit }
    : { ...axisLine, x2: rangeLimit };
}
