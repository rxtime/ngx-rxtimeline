import { Scale } from '../scale-types';

export interface TickMarkRenderer<TScale extends Scale> {
  getTickValues(scale: TScale): any[];
  getTickLabel(scale: TScale, tickValue: any): string;
  getTickLabelSpacing(): number;
  getTransform(scale: TScale, tickValue: any): number;
  getTickLineOffset(): number;
}

export const tickLabelSpacing = -2;
