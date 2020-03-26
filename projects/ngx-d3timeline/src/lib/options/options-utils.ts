import { Orientation } from '../core/orientation';
import {
  Options,
  AxisOptions,
  ActivityOptions,
  TypeOptions,
  CompleteOptions
} from './options';

export function getTimeOrientation(options: Options): Orientation {
  return options && Orientation[options.orientation];
}

export function getShowGridLines(axisOptions: AxisOptions): boolean {
  return axisOptions.showGridLines;
}

export function getTypeOptions(
  options: CompleteOptions,
  type: string
): TypeOptions {
  return options.type && options.type[type];
}

export function getTypeActivityOptions(
  typeOptions: (type: string) => TypeOptions,
  type: string
): ActivityOptions {
  return typeOptions(type) && typeOptions(type).activity;
}

export function getTickLineOffset(axisOptions: AxisOptions): number {
  return axisOptions.tickLineLength * -1;
}

export function getShowAxisLine(axisOptions: AxisOptions): boolean {
  return axisOptions.showAxisLine;
}

export function getFontFace(axisOptions: AxisOptions): string {
  return axisOptions.fontFace;
}

export function getFontSize(axisOptions: AxisOptions): number {
  return axisOptions.fontSize;
}

export function getStrokeWidth(activityOptions: ActivityOptions): number {
  return activityOptions.strokeWidth;
}

export function getDisableDrag(activityOptions: ActivityOptions): boolean {
  return activityOptions.disableDrag;
}
