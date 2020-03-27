import { identifier } from '../core/types';

export interface ActivityRectangle {
  id: identifier;
  title: string;
  type: string;
  showTitle: boolean;
  transform: string;
  width: number;
  height: number;
  fontFace: string;
  fontSize: number;
  strokeWidth: number;
  disableDrag: boolean;
  padding: number;
}
