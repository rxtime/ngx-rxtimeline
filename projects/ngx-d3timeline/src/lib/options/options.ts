export interface AxisOptions {
  tickLineLength: number;
  showGridLines: boolean;
}

export interface ResourceOptions {
  gap: number;
  padding: number;
}

export interface ActivityOptions {
  fontFace: string;
  fontSize: number;
}

export interface CompleteOptions {
  orientation: 'Vertical' | 'Horizontal';
  timeAxis: AxisOptions;
  resourceAxis: AxisOptions;
  resource: ResourceOptions;
  activity: ActivityOptions;
}

export type Options = Partial<CompleteOptions>;

export const defaultOptions: CompleteOptions = {
  orientation: 'Vertical',
  timeAxis: {
    tickLineLength: 5,
    showGridLines: true
  },
  resourceAxis: {
    tickLineLength: 0,
    showGridLines: true
  },
  resource: {
    gap: 0.25,
    padding: 5
  },
  activity: {
    fontFace: 'Arial',
    fontSize: 10
  }
};
