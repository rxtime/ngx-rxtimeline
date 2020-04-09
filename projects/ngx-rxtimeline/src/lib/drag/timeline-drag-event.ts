import { Identifier } from '../core/identifiable';

export interface TimelineDragEvent {
  id: Identifier;
  dx: number;
  dy: number;
  x: number;
  y: number;
}
