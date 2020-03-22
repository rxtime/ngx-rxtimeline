import { TimeScale } from '../scales/scale-types';
import { TickMarkRenderer, tickLabelSpacing } from './tick-mark-renderer';
import { OrientedScale } from '../scales/oriented-scale';

export function getTimeAxisTickMarkRenderer(
  orientedScale: OrientedScale<TimeScale>
): TickMarkRenderer {
  const tickLineOffset = -5;

  return {
    tickLineOffset,
    orientation: orientedScale.orientation,
    getTickValues: () => orientedScale.scale.ticks(),
    getTickLabel: (value: Date) => orientedScale.scale.tickFormat()(value),
    mapTickValueToPositionInScale: (value: Date) => orientedScale.scale(value),
    getTickLabelSpacing: () => tickLineOffset + tickLabelSpacing
  };
}
