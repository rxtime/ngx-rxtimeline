import { Point } from '../core/point';
import { Scale } from '../scales/scale-types';
import { Orientation } from '../core/orientation';
import { createLine, Line } from '../core/line';
import { Axis } from './axis';
import { OrientedScale } from '../scales/oriented-scale';
import { TickMark } from '../tick-mark/tick-mark';

function getRangeLimit(scale: Scale): number {
  return scale.range()[1];
}

function getAxisEndPoint(
  orientedScale: OrientedScale<Scale>,
  viewTopLeft: Point
): Point {
  return orientedScale.orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: getRangeLimit(orientedScale.scale) }
    : { ...viewTopLeft, x: getRangeLimit(orientedScale.scale) };
}

export function getAxisLine(
  viewTopLeft: Point,
  orientedScale: OrientedScale<Scale>
): Line {
  return createLine(viewTopLeft, getAxisEndPoint(orientedScale, viewTopLeft));
}

export function getAxis(line: Line, tickMarks: TickMark[]): Axis {
  return {
    line,
    tickMarks
  };
}
