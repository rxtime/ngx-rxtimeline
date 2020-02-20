import { TimeScale } from '../../scale-types';
import { TickRenderer } from '../tick-renderer';

export class TimeAxisTickRenderer implements TickRenderer {
  constructor(private scale: TimeScale) {}

  getTickValues(): Date[] {
    return this.scale.ticks();
  }

  getLabel(tick: any): string {
    return this.scale.tickFormat()(tick);
  }

  getTransform(tick: any): number {
    return this.scale(tick);
  }
}
