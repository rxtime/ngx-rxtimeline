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
import { tempStateSelector } from '../store/timeline-selectors';

@Injectable({ providedIn: 'root' })
export class ContentService {
  activityRectangles$ = this.store
    .select(tempStateSelector)
    .pipe(
      map(tempStateArgs =>
        this.createActivityRectangles(
          tempStateArgs.activities,
          tempStateArgs.dragEvent,
          tempStateArgs.timeOrientation,
          tempStateArgs.bandScale,
          tempStateArgs.timeScale
        )
      )
    );

  draggingRectangle$ = this.store
    .select(tempStateSelector)
    .pipe(
      map(tempStateArgs =>
        this.createDraggingRectangle(
          tempStateArgs.activities,
          tempStateArgs.dragEvent,
          tempStateArgs.timeOrientation,
          tempStateArgs.bandScale,
          tempStateArgs.timeScale
        )
      )
    );

  dropRectangle$ = this.store
    .select(tempStateSelector)
    .pipe(
      map(tempStateArgs =>
        this.createDropRectangle(
          tempStateArgs.bandScale,
          tempStateArgs.timeScale,
          tempStateArgs.activities,
          tempStateArgs.dragEvent,
          tempStateArgs.timeOrientation
        )
      )
    );

  fromRectangle$ = this.store
    .select(tempStateSelector)
    .pipe(
      map(tempStateArgs =>
        this.createFromRectangle(
          tempStateArgs.activities,
          tempStateArgs.dragEvent,
          tempStateArgs.timeOrientation,
          tempStateArgs.bandScale,
          tempStateArgs.timeScale
        )
      )
    );

  constructor(private store: Store) {}

  private createFromRectangle(
    activities: Activity[],
    dragEvent: TimelineDragEvent,
    timeOrientation: Orientation,
    bandScale: BandScale,
    timeScale: TimeScale
  ) {
    const draggingActivity = getDraggingActivity(activities, dragEvent);
    return (
      draggingActivity &&
      this.activityToActivityRectangle(
        draggingActivity,
        timeOrientation,
        bandScale,
        timeScale
      )
    );
  }

  private createActivityRectangles(
    activities: Activity[],
    dragEvent: TimelineDragEvent,
    timeOrientation: Orientation,
    bandScale: BandScale,
    timeScale: TimeScale
  ): ActivityRectangle[] {
    return activities
      .filter(activity => activity.id !== (dragEvent && dragEvent.id))
      .map(activity =>
        this.activityToActivityRectangle(
          activity,
          timeOrientation,
          bandScale,
          timeScale
        )
      );
  }

  private createDraggingRectangle(
    activities: Activity[],
    dragEvent: TimelineDragEvent,
    timeOrientation: Orientation,
    bandScale: BandScale,
    timeScale: TimeScale
  ): ActivityRectangle {
    const draggingActivity = getDraggingActivity(activities, dragEvent);
    return (
      draggingActivity &&
      this.activityToActivityRectangle(
        draggingActivity,
        timeOrientation,
        bandScale,
        timeScale,
        dragEvent
      )
    );
  }

  private createDropRectangle(
    bandScale: BandScale,
    timeScale: TimeScale,
    activities: Activity[],
    dragEvent: TimelineDragEvent,
    timeOrientation: Orientation
  ): ActivityRectangle {
    const dropActivity = getDropActivity(
      bandScale,
      timeScale,
      activities,
      dragEvent,
      timeOrientation
    );

    return (
      dropActivity &&
      this.activityToActivityRectangle(
        dropActivity,
        timeOrientation,
        bandScale,
        timeScale
      )
    );
  }

  private activityToActivityRectangle(
    activity: Activity,
    timeOrientation: Orientation,
    bandScale: BandScale,
    timeScale: TimeScale,
    dragEvent?: TimelineDragEvent
  ): ActivityRectangle {
    return {
      id: activity.id,
      title: activity.type,
      transform: this.activityTransform(
        activity,
        timeOrientation,
        bandScale,
        timeScale,
        dragEvent
      ),
      width: this.rectWidth(activity, timeOrientation, bandScale, timeScale),
      height: this.rectHeight(activity, timeOrientation, bandScale, timeScale)
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
