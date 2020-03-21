import { identifier } from './core/types';

export interface TimelineDragEvent {
  id: identifier;
  dx: number;
  dy: number;
  x: number;
  y: number;
}
