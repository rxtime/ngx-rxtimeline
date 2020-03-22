import { Point } from '../core/point';
import { Scale } from '../scales/scale-types';
import { Orientation } from '../core/orientation';
import { createLine, Line } from '../core/line';
import { Axis } from './axis';
import { TickMarkRenderer } from '../tick-mark/tick-mark-renderer';
import { getTickMarks } from '../tick-mark/tick-mark-utils';

function getRangeLimit(scale: Scale): number {
  return scale.range()[1];
}

function getAxisEndPoint(
  orientation: Orientation,
  scale: Scale,
  viewTopLeft: Point
): Point {
  return orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: getRangeLimit(scale) }
    : { ...viewTopLeft, x: getRangeLimit(scale) };
}

export function getAxisLine(
  viewTopLeft: Point,
  orientation: Orientation,
  scale: Scale
): Line {
  return createLine(
    viewTopLeft,
    getAxisEndPoint(orientation, scale, viewTopLeft)
  );
}

export function getAxis(
  getTickMarkRenderer: (
    scale: Scale,
    orientation: Orientation
  ) => TickMarkRenderer,
  scale: Scale,
  orientation: Orientation,
  viewTopLeft: Point,
  line: (o: Orientation, s: Scale) => Line
): Axis {
  return {
    line: line(orientation, scale),
    tickMarks: getTickMarks(
      viewTopLeft,
      getTickMarkRenderer(scale, orientation)
    )
  };
}
