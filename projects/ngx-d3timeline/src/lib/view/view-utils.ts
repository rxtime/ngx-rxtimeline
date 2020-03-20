import { TimelineView } from './timeline-view';
import { Point } from '../point';
import { Rectangle } from '../rectangle';

export function getViewTopLeft(view: TimelineView): Point {
  return { x: view.left, y: view.top };
}

export function getViewClipRectangle(view: TimelineView): Rectangle {
  return {
    width: view.width - 2 * view.margin,
    height: view.height - 2 * view.margin,
    x: view.left,
    y: view.top
  };
}
