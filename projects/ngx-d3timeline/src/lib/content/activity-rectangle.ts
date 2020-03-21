import { identifier } from '../core/types';

export interface ActivityRectangle {
  id: identifier;
  title: string;
  showTitle: boolean;
  transform: string;
  width: number;
  height: number;
  fontSize: number;
}
