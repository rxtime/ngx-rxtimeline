import { Orientation } from '../orientation';

export interface TickMarkRenderer {
  tickLineOffset: number;
  orientation: Orientation;
  getTickValues(): any[];
  getTickLabel(tickValue: any): string;
  getTickLabelSpacing(): number;
  mapTickValueToPositionInScale(tickValue: any): number;
}

export const tickLabelSpacing = -2;
