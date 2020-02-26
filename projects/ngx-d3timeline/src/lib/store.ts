import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { TimelineEvent } from './timeline-event';
import { TimelineView } from './view/timeline-view';
import { Orientation } from './orientation';
import { State } from './state';
import { map } from 'rxjs/operators';
import { DragService } from './content/drag.service';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly margin = 50;

  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);
  private viewSubject = new BehaviorSubject<TimelineView>(null);
  private axisOrientationsSubject = new BehaviorSubject<{
    timeOrientation: Orientation;
    resourceOrientation: Orientation;
  }>({
    timeOrientation: Orientation.Vertical,
    resourceOrientation: Orientation.Horizontal
  });

  state$: Observable<State> = combineLatest([
    this.dataSubject.asObservable(),
    this.viewSubject.asObservable(),
    this.axisOrientationsSubject.asObservable(),
    this.dragService.drag$
  ]).pipe(
    map(([data, view, axisOrientations, dragEvent]) => ({
      data,
      view,
      axisOrientations,
      dragEvent
    }))
  );

  private constructor(private dragService: DragService) {}

  setData(data: TimelineEvent[]) {
    this.dataSubject.next(data);
  }

  setView([width, height]: [number, number]) {
    this.viewSubject.next(
      new TimelineView({ width, height, margin: this.margin })
    );
  }

  setTimeOrientation(timeOrientation: Orientation) {
    const resourceOrientation = this.flipOrientation(timeOrientation);

    this.axisOrientationsSubject.next({ timeOrientation, resourceOrientation });
  }

  private flipOrientation(orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? Orientation.Horizontal
      : Orientation.Vertical;
  }
}
