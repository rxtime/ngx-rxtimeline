import { Activity } from './activity';

export interface PositionedActivity extends Activity {
  updatedStart: Date;
  updatedFinish: Date;
  updatedSeries: string;
}

const initialPosition: Omit<PositionedActivity, keyof Activity> = {
  updatedStart: null,
  updatedFinish: null,
  updatedSeries: null
};

export function initialisePositionedActivity(
  activity: Activity
): PositionedActivity {
  return { ...activity, ...initialPosition };
}
