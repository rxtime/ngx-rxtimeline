import { identifier } from '../core/types';
import { ActivityContent } from './activity-content';

export interface ActivityRectangle {
  id: identifier;
  type: string;
  showTitle: boolean;
  transform: string;
  width: number;
  height: number;
  fontFace: string;
  fontSize: number;
  strokeWidth: number;
  disableDrag: boolean;
  content: ActivityContent;
  selected: boolean;
  hovered: boolean;
}
