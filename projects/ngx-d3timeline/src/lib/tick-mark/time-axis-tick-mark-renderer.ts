import { TimeScale } from '../scales/scale-types';
import { TickMarkRenderer, tickLabelSpacing } from './tick-mark-renderer';
import { Orientation } from '../core/orientation';

export function getTimeAxisTickMarkRenderer(
  scale: TimeScale,
  orientation: Orientation
): TickMarkRenderer {
  const tickLineOffset = -5;

  return {
    tickLineOffset,
    orientation,
    scale,
    getTickValues: () => scale.ticks(),
    getTickLabel: (value: Date) => scale.tickFormat()(value),
    mapTickValueToPositionInScale: (value: Date) => scale(value),
    getTickLabelSpacing: () => tickLineOffset + tickLabelSpacing
  };
}
