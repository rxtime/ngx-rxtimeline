import { Orientation } from './orientation';
import { createOrientedLine } from './axis/line';
import { origin, Point } from './point';
import { pointToTransform } from './transform-utils';
import { TickMarkRenderer } from './axis/tick-mark-renderer';
import { TickMark } from './axis/tick-mark';
import { flipOrientation } from './orientation-utils';

function getTickLine(lineOffset: number, orientation: Orientation) {
  return lineOffset && createOrientedLine(origin, lineOffset, orientation);
}

function getTickLabelOffset(labelSpacing: number, orientation: Orientation) {
  return orientation === Orientation.Vertical
    ? { ...origin, y: labelSpacing }
    : { ...origin, x: labelSpacing };
}

function getTickMarkTopLeft(
  range: number,
  orientation: Orientation,
  viewTopLeft: Point
): Point {
  return orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: range }
    : { ...viewTopLeft, x: range };
}

function getTickMark(
  viewTopLeft: Point,
  tickValue: any,
  tickMarkRenderer: TickMarkRenderer
): TickMark {
  return {
    label: tickMarkRenderer.getTickLabel(tickValue),
    transform: pointToTransform(
      getTickMarkTopLeft(
        tickMarkRenderer.mapTickValueToPositionInScale(tickValue),
        tickMarkRenderer.orientation,
        viewTopLeft
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
  viewTopLeft: Point,
  tickMarkRenderer: TickMarkRenderer
): TickMark[] {
  return tickMarkRenderer
    .getTickValues()
    .map(value => getTickMark(viewTopLeft, value, tickMarkRenderer));
}
