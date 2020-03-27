import { PositionedActivity } from '../activity/positioned-activity';
import { TimeScale, BandScale } from '../scales/scale-types';
import { Orientation } from '../core/orientation';
import { Point, translatePoint, pointToTransform } from '../core/point';
import { ActivityRectangle } from '../activity-rectangle/activity-rectangle';
import { getTextWidth } from '../core/text-utils';

type PositionInAxis = (p: PositionedActivity) => number;
export type PointInAxis = (p: PositionedActivity) => Point;
export type ActivityTransform = (p: PositionedActivity) => string;

export const activityTitlePadding = 2;

export function getPositionInResourceAxis(
  bandScale: BandScale,
  resourcePadding: number,
  getActivityLateralMargin: (type: string) => number,
  positionedActivity: PositionedActivity
): number {
  return (
    bandScale(positionedActivity.updatedResource) +
    resourcePadding +
    getActivityLateralMargin(positionedActivity.type)
  );
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

export function getRectBreadthInResourceAxis(
  bandScale: BandScale,
  resourcePadding: number,
  activityLateralMargin: (type: string) => number,
  positionedActivity: PositionedActivity
) {
  return (
    bandScale.bandwidth() -
    2 * resourcePadding -
    2 * activityLateralMargin(positionedActivity.type)
  );
}

export function getActivityTitleBreadthInTimeAxis(
  timeOrientation: Orientation,
  fontFace: (type: string) => string,
  fontSize: (type: string) => number,
  positionedActivity: PositionedActivity
): number {
  return timeOrientation === Orientation.Vertical
    ? fontSize(positionedActivity.type)
    : getTextWidth(
        positionedActivity.type,
        fontFace(positionedActivity.type),
        fontSize(positionedActivity.type)
      );
}

export function getMinBreadthToShowTitle(
  activityTitleBreadthInTimeAxis: PositionInAxis,
  positionedActivity: PositionedActivity
) {
  return (
    activityTitleBreadthInTimeAxis(positionedActivity) + activityTitlePadding
  );
}

export function getShowTitle(
  rectBreadthInTimeAxis: PositionInAxis,
  minBreadthToShowTitle: PositionInAxis,
  positionedActivity: PositionedActivity
): boolean {
  return (
    rectBreadthInTimeAxis(positionedActivity) >
    minBreadthToShowTitle(positionedActivity)
  );
}

export function getRectHeight(
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: PositionInAxis,
  rectBreadthInResourceAxis: PositionInAxis,
  positionedActivity: PositionedActivity
): number {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInTimeAxis(positionedActivity)
    : rectBreadthInResourceAxis(positionedActivity);
}

export function getRectWidth(
  timeOrientation: Orientation,
  rectBreadthInTimeAxis: PositionInAxis,
  rectBreadthInResourceAxis: PositionInAxis,
  positionedActivity: PositionedActivity
) {
  return timeOrientation === Orientation.Vertical
    ? rectBreadthInResourceAxis(positionedActivity)
    : rectBreadthInTimeAxis(positionedActivity);
}

export function createActivityRectangle(
  transform: ActivityTransform,
  width: PositionInAxis,
  height: PositionInAxis,
  fontFace: (type: string) => string,
  fontSize: (type: string) => number,
  strokeWidth: (type: string) => number,
  disableDrag: (type: string) => boolean,
  showTitle: (p: PositionedActivity) => boolean,
  positionedActivity: PositionedActivity
): ActivityRectangle {
  return {
    id: positionedActivity.id,
    title: positionedActivity.type,
    type: positionedActivity.type,
    transform: transform(positionedActivity),
    width: width(positionedActivity),
    height: height(positionedActivity),
    fontFace: fontFace(positionedActivity.type),
    fontSize: fontSize(positionedActivity.type),
    disableDrag: disableDrag(positionedActivity.type),
    strokeWidth: strokeWidth(positionedActivity.type),
    showTitle: showTitle(positionedActivity)
  };
}
