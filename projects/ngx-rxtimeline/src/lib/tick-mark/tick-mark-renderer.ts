import { Orientation } from '../core/orientation';

export interface TickMarkRenderer {
  orientation: Orientation;
  mapTickValueToPositionInScale(tickValue: any): number;
}
