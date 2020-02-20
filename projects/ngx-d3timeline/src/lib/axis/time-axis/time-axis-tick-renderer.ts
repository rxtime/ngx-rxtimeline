import { TimeScale } from '../../scale-types';
import { TickRenderer } from '../tick-renderer';

export class TimeAxisTickRenderer implements TickRenderer {
  constructor(private scale: TimeScale) {}

  getTickValues(): any[] {
    return this.scale.ticks();
  }

  getLabel(tick: any) {
    return this.scale.tickFormat()(tick);
  }

  getTransform(tick: any) {
    return this.scale(tick);
  }
}
