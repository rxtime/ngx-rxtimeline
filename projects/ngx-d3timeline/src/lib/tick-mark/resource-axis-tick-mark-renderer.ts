import { BandScale } from '../scales/scale-types';
import {
  TickMarkRenderer,
  tickLabelSpacing
} from '../tick-mark/tick-mark-renderer';
import { OrientedScale } from '../scales/oriented-scale';
import { AxisOptions } from '../options/options';

export function getResourceAxisTickMarkRenderer(
  orientedScale: OrientedScale<BandScale>,
  axisOptions: AxisOptions
): TickMarkRenderer {
  const tickLineOffset = axisOptions.tickLineLength * -1;

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
