import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ActionType } from './actions';
import { shareReplay, scan } from 'rxjs/operators';
import { initialState } from './state';
import { State } from './state';
import { TimelineView } from '../view/timeline-view';
import { Actions } from './actions';
import { ScaleService } from '../scale.service';
import { OptionsService } from '../options.service';
import { TimelineDragEvent } from '../content/timeline-drag-event';
import { EventRectangle } from '../content/event-rectangle';
import { getDropTimelineEvent } from '../drag-util';
import { TimelineEvent } from '../timeline-event';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly replayBufferSize = 100;
  private actionsSubject = new ReplaySubject<Actions>(this.replayBufferSize);

  constructor(
    private scaleService: ScaleService,
    private optionsService: OptionsService
  ) {}

  state$ = this.actionsSubject.pipe(
    scan(this.reducer.bind(this), initialState),
    shareReplay()
  );

  dispatch(action: Actions) {
    this.actionsSubject.next(action);
  }

  private reducer(state: State, action: Actions): State {
    switch (action.type) {
      case ActionType.DataChanged: {
        return this.patchStateAndUpdateScales(state, { data: action.payload });
      }

      case ActionType.OrientationChanged: {
        return this.patchStateAndUpdateScales(state, {
          axisOrientations: this.optionsService.setAxisOrientations(
            action.payload
          )
        });
      }

      case ActionType.ViewChanged: {
        return this.patchStateAndUpdateScales(state, {
          view: new TimelineView(action.payload)
        });
      }

      case ActionType.Zoomed: {
        return {
          ...state,
          timeScale: this.scaleService.rescaleTime(state, action.payload)
        };
      }

      case ActionType.TimelineDragStarted:
      case ActionType.TimelineDragging: {
        return {
          ...state,
          dragEvent: this.setDragEvent(
            state.dragEvent,
            action.payload.eventRectangle,
            action.payload.event
          )
        };
      }

      case ActionType.TimelineDragEnded: {
        const data = this.dropTimelineEventOnDragEnd(state);
        return { ...state, data, dragEvent: null };
      }

      default: {
        return state;
      }
    }
  }

  private dropTimelineEventOnDragEnd(state: State): TimelineEvent[] {
    const dropEvent = getDropTimelineEvent(state);
    return state.data.map(data =>
      data.id === dropEvent.id ? dropEvent : data
    );
  }

  private patchStateAndUpdateScales(state: State, patch: Partial<State>) {
    const patchedState = { ...state, ...patch };
    return {
      ...patchedState,
      timeScale: this.scaleService.configureTimeScale(patchedState),
      bandScale: this.scaleService.configureBandScale(patchedState)
    };
  }

  private setDragEvent(
    dragEvent: TimelineDragEvent,
    eventRectangle: EventRectangle,
    event: any
  ) {
    return {
      ...dragEvent,
      id: eventRectangle.id,
      dx: dragEvent && dragEvent.dx + event.dx,
      dy: dragEvent && dragEvent.dy + event.dy,
      x: event.x,
      y: event.y
    };
  }
}
