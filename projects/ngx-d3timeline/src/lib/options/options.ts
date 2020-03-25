import { Complete } from '../core/types';

export interface AxisOptions {
  tickLineLength?: number;
  showGridLines?: boolean;
  showAxisLine?: boolean;
  fontFace: string;
  fontSize: number;
}

export interface ResourceOptions {
  gap?: number;
  padding?: number;
}

export interface ActivityOptions {
  fontFace?: string;
  fontSize?: number;
  padding?: number;
}

export interface TypeOptions {
  activity?: ActivityOptions;
}

export interface Options {
  orientation?: 'Vertical' | 'Horizontal';
  timeAxis?: AxisOptions;
  resourceAxis?: AxisOptions;
  resource?: ResourceOptions;
  activity?: ActivityOptions;
  type?: { [key: string]: TypeOptions };
}

export type CompleteOptions = Complete<Options>;

export const defaultOptions: CompleteOptions = {
  orientation: 'Vertical',
  timeAxis: {
    tickLineLength: 5,
    showGridLines: true,
    showAxisLine: true,
    fontFace: 'sans-serif',
    fontSize: 10
  },
  resourceAxis: {
    tickLineLength: 0,
    showGridLines: true,
    showAxisLine: true,
    fontFace: 'sans-serif',
    fontSize: 16
  },
  resource: {
    gap: 0.25,
    padding: 5
  },
  activity: {
    fontFace: 'Arial',
    fontSize: 10,
    padding: 0
  },
  type: {}
};
