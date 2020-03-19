import { BandScale } from '../../scale-types';
import { TickMarkRenderer, tickLabelSpacing } from '../tick-mark-renderer';
import { Orientation } from '../../orientation';

export function getResourceAxisTickMarkRenderer(
  scale: BandScale,
  orientation: Orientation
): TickMarkRenderer {
  const tickLineOffset = 0;

  function getBandMidPoint(tickValue: string): number {
    return scale(tickValue) + scale.bandwidth() / 2;
  }

  return {
    getTickLabel: (tickValue: string) => tickValue,
    getTickLabelSpacing: () => tickLineOffset + tickLabelSpacing,
    getTickValues: () => scale.domain(),
    mapTickValueToPositionInScale: (tickValue: string) =>
      getBandMidPoint(tickValue),
    tickLineOffset,
    orientation
  };
}
