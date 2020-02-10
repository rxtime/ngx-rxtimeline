export interface TimelineEvent {
  id: number;
  start: Date;
  finish: Date;
  type?: string;
  series?: string;
  title?: string;
  sequence?: number;
}
