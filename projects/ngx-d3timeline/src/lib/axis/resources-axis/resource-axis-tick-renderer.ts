import { BandScale } from '../../scale-types';
import { TickRenderer } from '../tick-renderer';

export class ResourceAxisTickRenderer implements TickRenderer<BandScale> {
  getTickValues(scale: BandScale): string[] {
    return scale.domain();
  }

  getLabel(_: BandScale, tick: any): string {
    return tick;
  }

  getTransform(scale: BandScale, tick: any): number {
    return this.getBandMidPoint(scale, tick);
  }

  private getBandMidPoint(scale: BandScale, tick: string): number {
    return scale(tick) + scale.bandwidth() / 2;
  }

  getTickLineOffset() {
    return 0;
  }
}
