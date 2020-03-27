import { PositionedActivity } from './positioned-activity';
import { Identifiable } from '../core/types';

export interface Activity extends Identifiable {
  id: number;
  start: Date;
  finish: Date;
  type?: string;
  resource?: string;
  title?: string;
  sequence?: number;
}

const positionedActivityToActivityMap = {
  updatedResource: 'resource',
  updatedFinish: 'finish',
  updatedStart: 'start'
};

export function getActivityFromPositionedActivity(
  positionedActivity: PositionedActivity
): Activity {
  const activity: Activity = { ...positionedActivity };

  Object.keys(positionedActivityToActivityMap).forEach(k => {
    activity[positionedActivityToActivityMap[k]] = positionedActivity[k];
    delete activity[k];
  });

  return activity;
}
