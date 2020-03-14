import { Injectable } from '@angular/core';
import { Orientation } from './orientation';
import { TimelineView } from './view/timeline-view';
import { createLine } from './axis/line';

@Injectable({ providedIn: 'root' })
export class OptionsService {
  getTranslation(
    range: number,
    orientation: Orientation,
    timelineView: TimelineView
  ) {
    return orientation === Orientation.Vertical
      ? `translate(${timelineView.left}, ${range})`
      : `translate(${range}, ${timelineView.top})`;
  }

  getTickLine(lineOffset: number, orientation: Orientation) {
    return lineOffset && createLine(0, 0, lineOffset, orientation);
  }
}
