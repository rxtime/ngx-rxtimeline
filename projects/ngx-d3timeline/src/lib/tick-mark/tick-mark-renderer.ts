import { Orientation } from '../core/orientation';
import { Scale } from '../scales/scale-types';

export interface TickMarkRenderer {
  tickLineOffset: number;
  orientation: Orientation;
  scale: Scale;
  getTickValues(): any[];
  getTickLabel(tickValue: any): string;
  getTickLabelSpacing(): number;
  mapTickValueToPositionInScale(tickValue: any): number;
}

export const tickLabelSpacing = -2;
