import { View } from './view';
import { Point } from '../core/point';
import { Rectangle } from '../core/rectangle';

export function getViewTopLeft(view: View): Point {
  return { x: view.left, y: view.top };
}

export function getViewClipRectangle(view: View): Rectangle {
  return {
    width: view.width - 2 * view.margin,
    height: view.height - 2 * view.margin,
    x: view.left,
    y: view.top
  };
}
