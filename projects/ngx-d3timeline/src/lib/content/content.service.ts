import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { State } from '../store/state';
import { map } from 'rxjs/operators';
import { Activity } from '../activity';
import { ActivityRectangle } from './activity-rectangle';
import { Orientation } from '../orientation';
import { TimeScale, BandScale } from '../scale-types';
import { TimelineDragEvent } from './timeline-drag-event';
import { getDraggingActivity, getDropActivity } from '../drag-utils';

@Injectable({ providedIn: 'root' })
export class ContentService {
  activityRectangles$ = this.store.state$.pipe(
    map(state => this.createActivityRectangles(state))
  );

  draggingRectangle$ = this.store.state$.pipe(
    map(state => this.createDraggingRectangle(state))
  );

  dropRectangle$ = this.store.state$.pipe(
    map(state => this.createDropRectangle(state))
  );

  fromRectangle$ = this.store.state$.pipe(
    map(state => this.createFromRectangle(state))
  );

  constructor(private store: Store) {}

  private createFromRectangle(state: State) {
    const draggingActivity = getDraggingActivity(state);
    return (
      draggingActivity &&
      this.activityToActivityRectangle(draggingActivity, state)
    );
  }

  private createActivityRectangles(state: State): ActivityRectangle[] {
    return state.activities
      .filter(
        activity => activity.id !== (state.dragEvent && state.dragEvent.id)
      )
      .map(activity => this.activityToActivityRectangle(activity, state));
  }

  private createDraggingRectangle(state: State): ActivityRectangle {
    const draggingActivity = getDraggingActivity(state);
    return (
      draggingActivity &&
      this.activityToActivityRectangle(draggingActivity, state, state.dragEvent)
    );
  }

  private createDropRectangle(state: State): ActivityRectangle {
    const dropActivity = getDropActivity(state);

    return (
      dropActivity && this.activityToActivityRectangle(dropActivity, state)
    );
  }

  private activityToActivityRectangle(
    activity: Activity,
    state: State,
    dragEvent?: TimelineDragEvent
  ): ActivityRectangle {
    return {
      id: activity.id,
      title: activity.type,
      transform: this.activityTransform(
        activity,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale,
        dragEvent
      ),
      width: this.rectWidth(
        activity,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale
      ),
      height: this.rectHeight(
        activity,
        state.axisOrientations.time,
        state.bandScale,
        state.timeScale
      )
    };
  }

  private activityTransform(
    activity: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale,
    dragEvent?: TimelineDragEvent
  ) {
    const activityX = this.getActivityX(
      activity,
      orientation,
      scaleBand,
      scaleTime
    );
    const dx = (dragEvent && dragEvent.dx) || 0;

    const activityY = this.getActivityY(
      activity,
      orientation,
      scaleBand,
      scaleTime
    );
    const dy = (dragEvent && dragEvent.dy) || 0;

    return `translate(${activityX + dx}, ${activityY + dy})`;
  }

  private rectHeight(
    activity: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectTimeBreadth(activity, scaleTime)
      : this.rectResourceBreadth(scaleBand);
  }

  private rectWidth(
    activity: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectResourceBreadth(scaleBand)
      : this.rectTimeBreadth(activity, scaleTime);
  }
  private getActivityX(
    activity: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInResourceAxis(activity, scaleBand)
      : this.positionInTimeAxis(activity, scaleTime);
  }

  private getActivityY(
    activity: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInTimeAxis(activity, scaleTime)
      : this.positionInResourceAxis(activity, scaleBand);
  }

  private positionInResourceAxis(
    activity: Activity,
    scaleBand: BandScale
  ): number {
    return scaleBand(activity.series);
  }

  private positionInTimeAxis(activity: Activity, scaleTime: TimeScale): number {
    return scaleTime(activity.start);
  }

  private rectTimeBreadth(activity: Activity, scaleTime: TimeScale): number {
    return scaleTime(activity.finish) - scaleTime(activity.start);
  }

  private rectResourceBreadth(scaleBand: BandScale): number {
    return scaleBand.bandwidth();
  }
}
