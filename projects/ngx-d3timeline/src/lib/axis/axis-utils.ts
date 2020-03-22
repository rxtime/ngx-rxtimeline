import { Point } from '../core/point';
import { Scale } from '../scales/scale-types';
import { Orientation, flipOrientation } from '../core/orientation';
import { createLine, Line, createOrientedLine } from '../core/line';
import { Axis } from './axis';
import { OrientedScale } from '../scales/oriented-scale';
import { TickMark } from '../tick-mark/tick-mark';

function getRangeLimit(scale: Scale): number {
  return scale.range()[1];
}

export function getAxisEndPoint(
  viewTopLeft: Point,
  orientedScale: OrientedScale<Scale>
): Point {
  return orientedScale.orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: getRangeLimit(orientedScale.scale) }
    : { ...viewTopLeft, x: getRangeLimit(orientedScale.scale) };
}

export function getAxisLine(
  viewTopLeft: Point,
  orientedScale: OrientedScale<Scale>
): Line {
  return createLine(viewTopLeft, getAxisEndPoint(viewTopLeft, orientedScale));
}

export function getTickGridLine(
  tickMarkPosition: (o: Orientation, range: number) => Point,
  orientedScale: OrientedScale<Scale>,
  otherOrientedScale: OrientedScale<Scale>,
  tickValue: any
): Line {
  return createOrientedLine(
    tickMarkPosition(orientedScale.orientation, orientedScale.scale(tickValue)),
    otherOrientedScale.scale.range()[1],
    flipOrientation(orientedScale.orientation)
  );
}

export function getAxis(
  line: Line,
  tickMarks: TickMark[],
  showGridLines: boolean,
  gridLines: Line[]
): Axis {
  return {
    line,
    tickMarks,
    showGridLines,
    gridLines
  };
}
