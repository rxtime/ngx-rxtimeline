import { BandScale } from '../scales/scale-types';
import {
  TickMarkRenderer,
  tickLabelSpacing
} from '../tick-mark/tick-mark-renderer';
import { Orientation } from '../core/orientation';

export function getResourceAxisTickMarkRenderer(
  scale: BandScale,
  orientation: Orientation
): TickMarkRenderer {
  const tickLineOffset = 0;

  function getBandMidPoint(tickValue: string): number {
    return scale(tickValue) + scale.bandwidth() / 2;
  }

  return {
    tickLineOffset,
    orientation,
    scale,
    getTickLabel: (tickValue: string) => tickValue,
    getTickLabelSpacing: () => tickLineOffset + tickLabelSpacing,
    getTickValues: () => scale.domain(),
    mapTickValueToPositionInScale: (tickValue: string) =>
      getBandMidPoint(tickValue)
  };
}
