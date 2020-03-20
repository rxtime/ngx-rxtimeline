import { Activity } from './activity';

export interface PositionedActivity extends Activity {
  updatedStart: Date;
  updatedFinish: Date;
  updatedResource: string;
}

function initialPosition(
  activity: Activity
): Omit<PositionedActivity, keyof Activity> {
  return {
    updatedStart: activity.start,
    updatedFinish: activity.finish,
    updatedResource: activity.resource
  };
}

export function initialisePositionedActivity(
  activity: Activity
): PositionedActivity {
  return { ...activity, ...initialPosition(activity) };
}
