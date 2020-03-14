import { BandScale } from '../../scale-types';
import { TickMarkRenderer, tickLabelSpacing } from '../tick-mark-renderer';

export class ResourceAxisTickMarkRenderer
  implements TickMarkRenderer<BandScale> {
  private readonly tickLineOffset = 0;

  getTickValues(scale: BandScale): string[] {
    return scale.domain();
  }

  getTickLabel(_: BandScale, tickValue: any): string {
    return tickValue;
  }

  getTransform(scale: BandScale, tickValue: any): number {
    return this.getBandMidPoint(scale, tickValue);
  }

  getTickLineOffset(): number {
    return this.tickLineOffset;
  }

  getTickLabelSpacing(): number {
    return this.tickLineOffset + tickLabelSpacing;
  }

  private getBandMidPoint(scale: BandScale, tickValue: string): number {
    return scale(tickValue) + scale.bandwidth() / 2;
  }
}
