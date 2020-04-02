import { View } from './view';
import { Point } from '../core/point';
import { Rectangle } from '../core/rectangle';

export function getViewTopLeft(view: View): Point {
  return { x: view.left, y: view.top };
}

export function getViewClipRectHeight(view: View): number {
  return view.height - 2 * View.margin;
}

export function getViewClipRectWidth(view: View): number {
  return view.width - 2 * View.margin;
}

export function getViewClipRect(
  viewTopLeft: Point,
  width: number,
  height: number
): Rectangle {
  return {
    ...viewTopLeft,
    width,
    height
  };
}
