import { BandScale } from '../scales/scale-types';
import { TickMarkRenderer } from '../tick-mark/tick-mark-renderer';
import { OrientedScale } from '../scales/oriented-scale';

export function getResourceAxisTickMarkRenderer(
  orientedScale: OrientedScale<BandScale>
): TickMarkRenderer {
  function getBandMidPoint(tickValue: string): number {
    return orientedScale.scale(tickValue) + orientedScale.scale.bandwidth() / 2;
  }

  return {
    orientation: orientedScale.orientation,
    mapTickValueToPositionInScale: (tickValue: string) =>
      getBandMidPoint(tickValue)
  };
}
