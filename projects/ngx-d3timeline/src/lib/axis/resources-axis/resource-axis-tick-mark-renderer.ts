import { BandScale } from '../../scale-types';
import { TickMarkRenderer, tickLabelSpacing } from '../tick-mark-renderer';

export class ResourceAxisTickMarkRenderer
  implements TickMarkRenderer<BandScale> {
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
    return 0;
  }

  getTickLabelSpacing(): number {
    return tickLabelSpacing;
  }

  private getBandMidPoint(scale: BandScale, tickValue: string): number {
    return scale(tickValue) + scale.bandwidth() / 2;
  }
}
