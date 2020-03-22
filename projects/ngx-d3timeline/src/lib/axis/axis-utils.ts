import { Point } from '../core/point';
import { Scale } from '../scales/scale-types';
import { Orientation } from '../core/orientation';
import { createLine, Line } from '../core/line';
import { Axis } from './axis';
import { TickMarkRenderer } from '../tick-mark/tick-mark-renderer';
import { TickMark } from '../tick-mark/tick-mark';

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
  tickMarkRenderer: TickMarkRenderer
): Line {
  return createLine(
    viewTopLeft,
    getAxisEndPoint(
      tickMarkRenderer.orientation,
      tickMarkRenderer.scale,
      viewTopLeft
    )
  );
}

export function getAxis(line: Line, tickMarks: TickMark[]): Axis {
  return {
    line,
    tickMarks
  };
}
