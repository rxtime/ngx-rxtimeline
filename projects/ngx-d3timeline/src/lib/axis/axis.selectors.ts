import { createSelector } from '../store-lib/selector/create-selector';
import { getAxis, getAxisLine } from './axis-utils';
import { selectViewTopLeft } from '../view/view.selectors';
import {
  selectResourceAxisTickMarks,
  selectTimeAxisTickMarks,
  selectResourceAxisTickMarkRenderer,
  selectTimeAxisTickMarkRenderer
} from '../tick-mark/tick-mark.selector';
import { TickMarkRenderer } from '../tick-mark/tick-mark-renderer';
import { Line } from '../core/line';

const selectAxisLine = createSelector(selectViewTopLeft, viewTopLeft =>
  getAxisLine.bind(null, viewTopLeft)
);

export const selectResourceAxisLine = createSelector(
  selectResourceAxisTickMarkRenderer,
  selectAxisLine,
  axisLineFromTickMarkRenderer
);

export const selectTimeAxisLine = createSelector(
  selectTimeAxisTickMarkRenderer,
  selectAxisLine,
  axisLineFromTickMarkRenderer
);

export const selectResourceAxis = createSelector(
  selectResourceAxisLine,
  selectResourceAxisTickMarks,
  getAxis
);

export const selectTimeAxis = createSelector(
  selectTimeAxisLine,
  selectTimeAxisTickMarks,
  getAxis
);

function axisLineFromTickMarkRenderer(
  tickMarkRenderer: TickMarkRenderer,
  line: (t: TickMarkRenderer) => Line
) {
  return line(tickMarkRenderer);
}
