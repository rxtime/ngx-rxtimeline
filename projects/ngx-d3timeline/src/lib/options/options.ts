export interface AxisOptions {
  tickLineLength: number;
  showGridLines: boolean;
}

export interface CompleteOptions {
  orientation: 'Vertical' | 'Horizontal';
  activityFontSize: number;
  timeAxis: AxisOptions;
  resourceAxis: AxisOptions;
}

export type Options = Partial<CompleteOptions>;

export const defaultOptions: CompleteOptions = {
  orientation: 'Vertical',
  activityFontSize: 10,
  timeAxis: {
    tickLineLength: 5,
    showGridLines: true
  },
  resourceAxis: {
    tickLineLength: 0,
    showGridLines: true
  }
};
