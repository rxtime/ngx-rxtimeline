import { PositionedActivity } from '../positioned-activity';
import { TimeScale, BandScale } from '../scale-types';
import { Orientation } from '../orientation';
import { Point, translatePoint } from '../point';
import { ActivityRectangle } from './activity-rectangle';
import { pointToTransform } from '../transform-utils';

type PositionInAxis = (p: PositionedActivity) => number;
export type PointInAxis = (p: PositionedActivity) => Point;
export type ActivityTransform = (p: PositionedActivity) => string;

export const activityTitlePadding = 2;

export function getPositionInResourceAxis(
  bandScale: BandScale,
  positionedActivity: PositionedActivity
): number {
  return bandScale(positionedActivity.updatedResource);
}

export function getPositionInTimeAxis(
  timeScale: TimeScale,
  positionedActivity: PositionedActivity
): number {
  return timeScale(positionedActivity.updatedStart);
}

export function getActivityX(
  timeOrientation: Orientation,
  positionInResourceAxis: PositionInAxis,
  positionInTimeAxis: PositionInAxis,
  positionedActivity: PositionedActivity
): number {
  return timeOrientation === Orientation.Vertical
    ? positionInResourceAxis(positionedActivity)
    : positionInTimeAxis(positionedActivity);
}

export function getActivityY(
  timeOrientation: Orientation,
  positionInResourceAxis: PositionInAxis,
  positionInTimeAxis: PositionInAxis,
  positionedActivity: PositionedActivity
): number {
  return timeOrientation === Orientation.Vertical
    ? positionInTimeAxis(positionedActivity)
    : positionInResourceAxis(positionedActivity);
}

export function getActivityTopLeft(
  x: PositionInAxis,
  y: PositionInAxis,
  positionedActivity: PositionedActivity
): Point {
  return { x: x(positionedActivity), y: y(positionedActivity) };
}

export function getOffsetActivityTopLeft(
  activityTopLeft: PointInAxis,
  offset: Point,
  positionedActivity: PositionedActivity
): Point {
  return translatePoint(activityTopLeft(positionedActivity), offset);
}

export function getActivityTransform(
  activityTopLeft: PointInAxis,
  positionedActivity: PositionedActivity
): string {
  return pointToTransform(activityTopLeft(positionedActivity));
}

export function getRectBreadthInTimeAxis(
  timeScale: TimeScale,
  positionedActivity: PositionedActivity
): number {
  return (
    timeScale(positionedActivity.finish) - timeScale(positionedActivity.start)
  );
}

export function getMinHeightToShowLabel(fontSize: number) {
  return fontSize + activityTitlePadding;
}

export function getShowTitle(
  rectBreadthInTimeAxis: PositionInAxis,
  minHeightToShowTitle: number,
  positionedActivity: PositionedActivity
): boolean {
  return rectBreadthInTimeAxis(positionedActivity) > minHeightToShowTitle;
}

export function getRectHeight(
  timeOrientation: Orientation,
  rectBreathInTimeAxis: PositionInAxis,
  rectBreadthInResourceAxis: number,
  positionedActivity: PositionedActivity
): number {
  return timeOrientation === Orientation.Vertical
    ? rectBreathInTimeAxis(positionedActivity)
    : rectBreadthInResourceAxis;
}

export function getRectWidth(
  timeOrientation: Orientation,
  rectBreathInTimeAxis: PositionInAxis,
  rectBreadthInResourceAxis: number,
  positionedActivity: PositionedActivity
) {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInResourceAxis
    : rectBreathInTimeAxis(positionedActivity);
}

export function createActivityRectangle(
  transform: ActivityTransform,
  width: PositionInAxis,
  height: PositionInAxis,
  fontSize: number,
  showTitle: (p: PositionedActivity) => boolean,
  positionedActivity: PositionedActivity
): ActivityRectangle {
  return {
    id: positionedActivity.id,
    title: positionedActivity.type,
    transform: transform(positionedActivity),
    width: width(positionedActivity),
    height: height(positionedActivity),
    fontSize,
    showTitle: showTitle(positionedActivity)
  };
}
