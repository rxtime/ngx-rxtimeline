import { BandScale } from '../../scale-types';
import { TickRenderer } from '../tick-renderer';

export class ResourceAxisTickRenderer implements TickRenderer {
  constructor(private scale: BandScale) {}

  getTickValues(): any[] {
    return this.scale.domain();
  }

  getLabel(tick: any) {
    return tick;
  }

  getTransform(tick: any) {
    return this.getBandMidPoint(tick);
  }

  private getBandMidPoint(tick: string) {
    return this.scale(tick) + this.scale.bandwidth() / 2;
  }
}
