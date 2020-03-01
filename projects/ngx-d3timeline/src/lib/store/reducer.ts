import { State } from './state';
import { Actions, ActionType } from './actions';
import { TimelineView } from '../view/timeline-view';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.DataChanged: {
      return { ...state, data: action.payload };
    }

    case ActionType.OrientationChanged: {
      return {
        ...state,
        axisOrientations: this.optionsService.setAxisOrientations(
          action.payload
        )
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
