import { Orientation } from './orientation';

export interface Options {
  orientation: Orientation;
  activityFontSize: number;
}

export const defaultOptions: Options = {
  orientation: Orientation.Vertical,
  activityFontSize: 10
};
