export interface TickRenderer {
  getTickValues(): any[];
  getLabel(tick: any);
  getTransform(tick: any);
}
