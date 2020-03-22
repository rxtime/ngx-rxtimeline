import { BandScale } from '../scales/scale-types';
import {
  TickMarkRenderer,
  tickLabelSpacing
} from '../tick-mark/tick-mark-renderer';
import { OrientedScale } from '../scales/oriented-scale';

export function getResourceAxisTickMarkRenderer(
  orientedScale: OrientedScale<BandScale>,
  tickLineOffset: number
): TickMarkRenderer {
  function getBandMidPoint(tickValue: string): number {
    return orientedScale.scale(tickValue) + orientedScale.scale.bandwidth() / 2;
  }

  return {
    tickLineOffset,
    orientation: orientedScale.orientation,
    getTickLabel: (tickValue: string) => tickValue,
    getTickLabelSpacing: () => tickLineOffset + tickLabelSpacing,
    mapTickValueToPositionInScale: (tickValue: string) =>
      getBandMidPoint(tickValue)
  };
}
