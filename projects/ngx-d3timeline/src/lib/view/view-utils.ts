import { TimelineView } from './timeline-view';
import { Point } from '../point';

export function getViewTopLeft(view: TimelineView): Point {
  return { x: view.left, y: view.top };
}
