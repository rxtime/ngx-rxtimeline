import { BandScale } from '../../scale-types';
import { TickRenderer } from '../tick-renderer';

export class ResourceAxisTickRenderer implements TickRenderer {
  constructor(private scale: BandScale) {}

  getTickValues(): string[] {
    return this.scale.domain();
  }

  getLabel(tick: any): string {
    return tick;
  }

  getTransform(tick: any): number {
    return this.getBandMidPoint(tick);
  }

  private getBandMidPoint(tick: string): number {
    return this.scale(tick) + this.scale.bandwidth() / 2;
  }
}
