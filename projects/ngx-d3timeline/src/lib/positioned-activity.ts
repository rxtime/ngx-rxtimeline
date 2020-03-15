import { Activity } from './activity';
import { Actions } from './store/actions';

export interface PositionedActivity extends Activity {
  updatedStart: Date;
  updatedFinish: Date;
  updatedSeries: string;
}

function initialPosition(
  activity: Activity
): Omit<PositionedActivity, keyof Activity> {
  return {
    updatedStart: activity.start,
    updatedFinish: activity.finish,
    updatedSeries: activity.series
  };
}

export function initialisePositionedActivity(
  activity: Activity
): PositionedActivity {
  return { ...activity, ...initialPosition(activity) };
}
