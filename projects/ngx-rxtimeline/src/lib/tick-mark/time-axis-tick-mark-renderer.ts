import { TimeScale } from '../scales/scale-types';
import { TickMarkRenderer } from './tick-mark-renderer';
import { OrientedScale } from '../scales/oriented-scale';

export function getTimeAxisTickMarkRenderer(
  orientedScale: OrientedScale<TimeScale>
): TickMarkRenderer {
  return {
    orientation: orientedScale.orientation,
    mapTickValueToPositionInScale: (value: Date) => orientedScale.scale(value)
  };
}
