import { Injectable } from '@angular/core';
import { TimelineView } from './timeline-view';

@Injectable({ providedIn: 'root' })
export class ViewService {
  timelineView: TimelineView = new TimelineView(400, 600, 50);

  get rootTransform() {
    return `translate(${this.timelineView.margin}, ${this.timelineView.margin})`;
  }
}
