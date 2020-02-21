import { Injectable } from '@angular/core';
import { Orientation } from './orientation';
import { TimelineView } from './view/timeline-view';

@Injectable({ providedIn: 'root' })
export class OptionsService {
  getTranslation(
    range: number,
    cx: number,
    cy: number,
    orientation: Orientation,
    timelineView: TimelineView
  ) {
    return orientation === Orientation.Vertical
      ? `translate(${timelineView.left + cx}, ${range + cy})`
      : `translate(${range + cx}, ${timelineView.top + cy})`;
  }
}
