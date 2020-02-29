import { Injectable } from '@angular/core';
import { Orientation } from './orientation';
import { TimelineView } from './view/timeline-view';
import { AxisOrientations } from './axis-orientations';

@Injectable({ providedIn: 'root' })
export class OptionsService {
  setAxisOrientations(timeOrientation: Orientation): AxisOrientations {
    const resourceOrientation = this.flipOrientation(timeOrientation);
    return { time: timeOrientation, resource: resourceOrientation };
  }

  getTranslation(
    range: number,
    orientation: Orientation,
    timelineView: TimelineView
  ) {
    return orientation === Orientation.Vertical
      ? `translate(${timelineView.left}, ${range})`
      : `translate(${range}, ${timelineView.top})`;
  }

  private flipOrientation(orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? Orientation.Horizontal
      : Orientation.Vertical;
  }

  getTickLineEnd(lineOffset: number, orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? { x: lineOffset, y: 0 }
      : { x: 0, y: lineOffset };
  }
}
