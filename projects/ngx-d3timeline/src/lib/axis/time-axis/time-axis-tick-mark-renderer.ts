import { TimeScale } from '../../scale-types';
import { TickMarkRenderer } from '../tick-mark-renderer';

export class TimeAxisTickMarkRenderer implements TickMarkRenderer<TimeScale> {
  getTickValues(scale: TimeScale): Date[] {
    return scale.ticks();
  }

  getTickLabel(scale: TimeScale, tickValue: any): string {
    return scale.tickFormat()(tickValue);
  }

  getTransform(scale: TimeScale, tickValue: any): number {
    return scale(tickValue);
  }

  getTickLineOffset(): number {
    return -5;
  }
}
