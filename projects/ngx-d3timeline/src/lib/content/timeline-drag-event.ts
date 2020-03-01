import { identifier } from '../types';

export interface TimelineDragEvent {
  id: identifier;
  dx: number;
  dy: number;
}
