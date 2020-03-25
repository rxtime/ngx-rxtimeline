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

export function getActivityOptionsPadding(
  activityOptions: ActivityOptions
): number {
  return activityOptions.padding;
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

export function getTypeActivityPadding(
  typeActivityOptions: (type: string) => ActivityOptions,
  type: string
): number {
  return typeActivityOptions(type) && typeActivityOptions(type).padding;
}

export function getActivityPadding(
  typeActivityPadding: (type: string) => number,
  activityOptionsPadding: number,
  type: string
) {
  return typeActivityPadding(type) || activityOptionsPadding;
}

export function getTickLineOffset(axisOptions: AxisOptions): number {
  return axisOptions.tickLineLength * -1;
}

export function getShowAxisLine(axisOptions: AxisOptions): boolean {
  return axisOptions.showAxisLine;
}
