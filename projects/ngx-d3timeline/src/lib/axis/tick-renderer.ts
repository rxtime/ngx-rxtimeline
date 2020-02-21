export interface TickRenderer {
  getTickValues(): any[];
  getLabel(tick: any): string;
  getTransform(tick: any): string;
  getTextAnchor(): string;
}
