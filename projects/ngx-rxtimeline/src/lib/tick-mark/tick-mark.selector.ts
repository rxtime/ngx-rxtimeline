import { createSelector } from '../store-lib/selector/create-selector';

import {
  selectOrientedTimeScale,
  selectOrientedBandScale,
  selectTimeScale,
  selectResources
} from '../scales/scale-selectors';
import { getTimeAxisTickMarkRenderer } from './time-axis-tick-mark-renderer';
import { getResourceAxisTickMarkRenderer } from './resource-axis-tick-mark-renderer';
import { mapValues } from '../core/transform-utils';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectResourceAxisTickLineOffset,
  selectTimeAxisTickLineOffset,
  selectResourceAxisFontFace,
  selectResourceAxisFontSize,
  selectTimeAxisFontFace,
  selectTimeAxisFontSize
} from '../options/selectors/axis-options.selectors';
import { partialApply } from '../core/function-utils';
import { BandScale, TimeScale } from '../scales/scale-types';
import { Orientation, flipOrientation } from '../core/orientation';
import { Point, pointToTransform, origin } from '../core/point';
import { TickMarkRenderer } from './tick-mark-renderer';
import { TickMark } from './tick-mark';
import { createOrientedLine } from '../core/line';

export const selectGetTickPosition = createSelector(
  selectViewTopLeft,
  viewTopLeft => getTickPosition.bind(null, viewTopLeft)
);

function getTickPosition(
  viewTopLeft: Point,
  orientation: Orientation,
  range: number
): Point {
  return orientation === Orientation.Vertical
    ? { ...viewTopLeft, y: range }
    : { ...viewTopLeft, x: range };
}

const selectResourceAxisTickMarkRenderer = createSelector(
  selectOrientedBandScale,
  selectResourceAxisTickLineOffset,
  getResourceAxisTickMarkRenderer
);

const selectTimeAxisTickMarkRenderer = createSelector(
  selectOrientedTimeScale,
  selectTimeAxisTickLineOffset,
  getTimeAxisTickMarkRenderer
);

const selectGetResourceAxisTickMark = createSelector(
  selectGetTickPosition,
  selectResourceAxisTickMarkRenderer,
  selectResourceAxisFontFace,
  selectResourceAxisFontSize,
  partialApply(getTickMark)
);

const selectGetTimeAxisTickMark = createSelector(
  selectGetTickPosition,
  selectTimeAxisTickMarkRenderer,
  selectTimeAxisFontFace,
  selectTimeAxisFontSize,
  partialApply(getTickMark)
);

function getTickMark(
  tickValue: any,
  tickPosition: (o: Orientation, range: number) => Point,
  tickMarkRenderer: TickMarkRenderer,
  fontFace: string,
  fontSize: number
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

function getTickLine(lineOffset: number, orientation: Orientation) {
  return lineOffset && createOrientedLine(origin, lineOffset, orientation);
}

function getTickLabelOffset(labelSpacing: number, orientation: Orientation) {
  return orientation === Orientation.Vertical
    ? { ...origin, y: labelSpacing }
    : { ...origin, x: labelSpacing };
}

export const selectTimeAxisTickValues = createSelector(
  selectTimeScale,
  getTimeAxisTickValues
);

function getTimeAxisTickValues(scale: TimeScale) {
  return scale.ticks();
}

export const selectResourceAxisTickMarks = createSelector(
  selectResources,
  selectGetResourceAxisTickMark,
  mapValues
);

export const selectTimeAxisTickMarks = createSelector(
  selectTimeAxisTickValues,
  selectGetTimeAxisTickMark,
  mapValues
);