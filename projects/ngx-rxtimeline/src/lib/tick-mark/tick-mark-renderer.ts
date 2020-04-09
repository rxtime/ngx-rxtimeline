import { Orientation } from '../core/orientation';

export interface TickMarkRenderer {
  tickLineOffset: number;
  orientation: Orientation;
  getTickLabel(tickValue: any): string;
  getTickLabelSpacing(): number;
  mapTickValueToPositionInScale(tickValue: any): number;
}

export const tickLabelSpacing = -2;
