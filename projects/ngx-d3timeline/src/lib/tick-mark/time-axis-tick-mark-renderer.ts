import { TimeScale } from '../scales/scale-types';
import { TickMarkRenderer, tickLabelSpacing } from './tick-mark-renderer';
import { OrientedScale } from '../scales/oriented-scale';
import { AxisOptions } from '../options/options';

export function getTimeAxisTickMarkRenderer(
  orientedScale: OrientedScale<TimeScale>,
  tickLineOffset: number
): TickMarkRenderer {
  return {
    tickLineOffset,
    orientation: orientedScale.orientation,
    getTickLabel: (value: Date) => orientedScale.scale.tickFormat()(value),
    mapTickValueToPositionInScale: (value: Date) => orientedScale.scale(value),
    getTickLabelSpacing: () => tickLineOffset + tickLabelSpacing
  };
}
