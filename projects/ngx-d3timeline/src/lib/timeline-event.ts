import { identifier } from './types';

export interface TimelineEvent {
  id: identifier;
  start: Date;
  finish: Date;
  type?: string;
  series?: string;
  title?: string;
  sequence?: number;
}
