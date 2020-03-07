import { Scale } from '../scale-types';
import { TimelineView } from '../view/timeline-view';
import { Orientation } from '../orientation';
import { TickRenderer } from './tick-renderer';
import { Axis } from './axis';
import { getTicks } from './tick-utils';
import { getAxisLine } from './axis-line/axis-line-utils';

export function createAxis<TScale extends Scale>(
  timelineView: TimelineView,
  orientation: Orientation,
  scale: TScale,
  tickRenderer: TickRenderer<TScale>
): Axis {
  return {
    ticks: getTicks(tickRenderer, scale, orientation, timelineView),
    axisLine: getAxisLine(scale, orientation, timelineView)
  };
}
