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
      .filter(data => data.id !== (state.dragEvent && state.dragEvent.id))
      .map(data => this.activityToActivityRectangle(data, state));
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
      transform: this.dataTransform(
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

  private dataTransform(
    data: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale,
    dragEvent?: TimelineDragEvent
  ) {
    const activityX = this.getActivityX(
      data,
      orientation,
      scaleBand,
      scaleTime
    );
    const dx = (dragEvent && dragEvent.dx) || 0;

    const activityY = this.getActivityY(
      data,
      orientation,
      scaleBand,
      scaleTime
    );
    const dy = (dragEvent && dragEvent.dy) || 0;

    return `translate(${activityX + dx}, ${activityY + dy})`;
  }

  private rectHeight(
    data: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectTimeBreadth(data, scaleTime)
      : this.rectResourceBreadth(scaleBand);
  }

  private rectWidth(
    data: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectResourceBreadth(scaleBand)
      : this.rectTimeBreadth(data, scaleTime);
  }
  private getActivityX(
    data: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInResourceAxis(data, scaleBand)
      : this.positionInTimeAxis(data, scaleTime);
  }

  private getActivityY(
    data: Activity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInTimeAxis(data, scaleTime)
      : this.positionInResourceAxis(data, scaleBand);
  }

  private positionInResourceAxis(data: Activity, scaleBand: BandScale): number {
    return scaleBand(data.series);
  }

  private positionInTimeAxis(data: Activity, scaleTime: TimeScale): number {
    return scaleTime(data.start);
  }

  private rectTimeBreadth(data: Activity, scaleTime: TimeScale): number {
    return scaleTime(data.finish) - scaleTime(data.start);
  }

  private rectResourceBreadth(scaleBand: BandScale): number {
    return scaleBand.bandwidth();
  }
}
