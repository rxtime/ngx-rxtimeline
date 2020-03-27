import { Orientation } from '../core/orientation';
import { createOrientedLine } from '../core/line';
import { origin, Point } from '../core/point';
import { pointToTransform } from '../core/point';
import { TickMarkRenderer } from './tick-mark-renderer';
import { TickMark } from './tick-mark';
import { flipOrientation } from '../core/orientation';
import { BandScale, TimeScale } from '../scales/scale-types';

function getTickLine(lineOffset: number, orientation: Orientation) {
  return lineOffset && createOrientedLine(origin, lineOffset, orientation);
}

function getTickLabelOffset(labelSpacing: number, orientation: Orientation) {
  return orientation === Orientation.Vertical
    ? { ...origin, y: labelSpacing }
    : { ...origin, x: labelSpacing };
}

export function getTickPosition(
  viewTopLeft: Point,
  orientation: Orientation,
  range: number
): Point {
  return orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: range }
    : { ...viewTopLeft, x: range };
}

export function getTickMark(
  tickPosition: (o: Orientation, range: number) => Point,
  tickMarkRenderer: TickMarkRenderer,
  fontFace: string,
  fontSize: number,
  tickValue: any
): TickMark {
  return {
    label: tickMarkRenderer.getTickLabel(tickValue),
    transform: pointToTransform(
      tickPosition(
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
    ),
    fontFace,
    fontSize
  };
}

export function getResourceAxisTickValues(scale: BandScale) {
  return scale.domain();
}

export function getTimeAxisTickValues(scale: TimeScale) {
  return scale.ticks();
}
