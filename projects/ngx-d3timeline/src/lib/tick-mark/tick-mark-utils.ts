import { Orientation } from '../core/orientation';
import { createOrientedLine } from '../core/line';
import { origin, Point } from '../core/point';
import { pointToTransform } from '../core/point';
import { TickMarkRenderer } from './tick-mark-renderer';
import { TickMark } from './tick-mark';
import { flipOrientation } from '../core/orientation';

function getTickLine(lineOffset: number, orientation: Orientation) {
  return lineOffset && createOrientedLine(origin, lineOffset, orientation);
}

function getTickLabelOffset(labelSpacing: number, orientation: Orientation) {
  return orientation === Orientation.Vertical
    ? { ...origin, y: labelSpacing }
    : { ...origin, x: labelSpacing };
}

export function getTickMarkTopLeft(
  viewTopLeft: Point,
  orientation: Orientation,
  range: number
): Point {
  return orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: range }
    : { ...viewTopLeft, x: range };
}

export function getTickMark(
  tickMarkTopLeft: (o: Orientation, range: number) => Point,
  tickValue: any,
  tickMarkRenderer: TickMarkRenderer
): TickMark {
  return {
    label: tickMarkRenderer.getTickLabel(tickValue),
    transform: pointToTransform(
      tickMarkTopLeft(
        tickMarkRenderer.orientation,
        tickMarkRenderer.mapTickValueToPositionInScale(tickValue)
      )
    ),
    labelOffset: getTickLabelOffset(
      tickMarkRenderer.getTickLabelSpacing(),
      flipOrientation(tickMarkRenderer.orientation)
    ),
    line: getTickLine(
      tickMarkRenderer.tickLineOffset,
      flipOrientation(tickMarkRenderer.orientation)
    )
  };
}

export function getTickMarks(
  tickMark: (value: any, tickMarkRenderer: TickMarkRenderer) => TickMark,
  tickMarkRenderer: TickMarkRenderer
): TickMark[] {
  return tickMarkRenderer
    .getTickValues()
    .map(value => tickMark(value, tickMarkRenderer));
}
