import { Scale } from '../types';

export interface TickRenderer<TScale extends Scale> {
  getTickValues(scale: TScale): any[];
  getLabel(scale: TScale, tick: any): string;
  getTransform(scale: TScale, tick: any): number;
  getTickLineOffset(): number;
}
