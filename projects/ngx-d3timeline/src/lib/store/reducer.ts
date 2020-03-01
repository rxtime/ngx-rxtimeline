import { State } from './state';
import { Actions, ActionType } from './actions';
import { TimelineView } from '../view/timeline-view';
import { Orientation } from '../orientation';
import { AxisOrientations } from '../axis-orientations';
import { flipOrientation } from '../utils';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.DataChanged: {
      return { ...state, data: action.payload };
    }

    case ActionType.OrientationChanged: {
      return {
        ...state,
        axisOrientations: setAxisOrientations(action.payload)
      };
    }

    case ActionType.ViewChanged: {
      return { ...state, view: new TimelineView(action.payload) };
    }

    default: {
      return state;
    }
  }
}

function setAxisOrientations(timeOrientation: Orientation): AxisOrientations {
  const resourceOrientation = flipOrientation(timeOrientation);
  return { time: timeOrientation, resource: resourceOrientation };
}
