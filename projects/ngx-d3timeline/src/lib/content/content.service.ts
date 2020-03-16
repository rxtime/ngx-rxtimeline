import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { map } from 'rxjs/operators';
import { PositionedActivity } from '../positioned-activity';
import { ActivityRectangle } from './activity-rectangle';
import { Orientation } from '../orientation';
import { TimeScale, BandScale } from '../scale-types';
import { TimelineDragEvent } from './timeline-drag-event';
import { getCurrentlyDraggedActivity, getDropActivity } from '../drag-utils';
import { tempStateSelector } from '../store/timeline-selectors';
import { Point } from '../point';
import { pointToTransform } from '../transform-utils';
import { selectNonDraggedActivityRectangles } from './activity-rectangle.selectors';

@Injectable({ providedIn: 'root' })
export class ContentService {
  activityRectangles$ = this.store.select(selectNonDraggedActivityRectangles);

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
    positionedActivities: PositionedActivity[],
    dragEvent: TimelineDragEvent,
    timeOrientation: Orientation,
    bandScale: BandScale,
    timeScale: TimeScale
  ) {
    const draggingActivity = getCurrentlyDraggedActivity(
      positionedActivities,
      dragEvent
    );
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

  private createDraggingRectangle(
    positionedActivities: PositionedActivity[],
    dragEvent: TimelineDragEvent,
    timeOrientation: Orientation,
    bandScale: BandScale,
    timeScale: TimeScale
  ): ActivityRectangle {
    const draggingActivity = getCurrentlyDraggedActivity(
      positionedActivities,
      dragEvent
    );
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
    positionedActivities: PositionedActivity[],
    dragEvent: TimelineDragEvent,
    timeOrientation: Orientation
  ): ActivityRectangle {
    const dropActivity = getDropActivity(
      bandScale,
      timeScale,
      positionedActivities,
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
    positionedActivity: PositionedActivity,
    timeOrientation: Orientation,
    bandScale: BandScale,
    timeScale: TimeScale,
    dragEvent?: TimelineDragEvent
  ): ActivityRectangle {
    return {
      id: positionedActivity.id,
      title: positionedActivity.type,
      transform: this.activityTransform(
        positionedActivity,
        timeOrientation,
        bandScale,
        timeScale,
        dragEvent
      ),
      width: this.rectWidth(
        positionedActivity,
        timeOrientation,
        bandScale,
        timeScale
      ),
      height: this.rectHeight(
        positionedActivity,
        timeOrientation,
        bandScale,
        timeScale
      )
    };
  }

  private activityTransform(
    positionedActivity: PositionedActivity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale,
    dragEvent?: TimelineDragEvent
  ) {
    const activityX = this.getActivityX(
      positionedActivity,
      orientation,
      scaleBand,
      scaleTime
    );
    const dx = (dragEvent && dragEvent.dx) || 0;

    const activityY = this.getActivityY(
      positionedActivity,
      orientation,
      scaleBand,
      scaleTime
    );
    const dy = (dragEvent && dragEvent.dy) || 0;

    const activityTopLeft: Point = { x: activityX + dx, y: activityY + dy };

    return pointToTransform(activityTopLeft);
  }

  private rectHeight(
    positionedActivity: PositionedActivity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectTimeBreadth(positionedActivity, scaleTime)
      : this.rectResourceBreadth(scaleBand);
  }

  private rectWidth(
    positionedActivity: PositionedActivity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.rectResourceBreadth(scaleBand)
      : this.rectTimeBreadth(positionedActivity, scaleTime);
  }
  private getActivityX(
    positionedActivity: PositionedActivity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInResourceAxis(positionedActivity, scaleBand)
      : this.positionInTimeAxis(positionedActivity, scaleTime);
  }

  private getActivityY(
    positionedActivity: PositionedActivity,
    orientation: Orientation,
    scaleBand: BandScale,
    scaleTime: TimeScale
  ) {
    return orientation === Orientation.Vertical
      ? this.positionInTimeAxis(positionedActivity, scaleTime)
      : this.positionInResourceAxis(positionedActivity, scaleBand);
  }

  private positionInResourceAxis(
    positionedActivity: PositionedActivity,
    scaleBand: BandScale
  ): number {
    return scaleBand(positionedActivity.updatedSeries);
  }

  private positionInTimeAxis(
    positionedActivity: PositionedActivity,
    scaleTime: TimeScale
  ): number {
    return scaleTime(positionedActivity.updatedStart);
  }

  private rectTimeBreadth(
    positionedActivity: PositionedActivity,
    scaleTime: TimeScale
  ): number {
    return (
      scaleTime(positionedActivity.finish) - scaleTime(positionedActivity.start)
    );
  }

  private rectResourceBreadth(scaleBand: BandScale): number {
    return scaleBand.bandwidth();
  }
}
