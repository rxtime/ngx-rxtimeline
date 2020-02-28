import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { TimelineEvent } from './timeline-event';
import { TimelineView } from './view/timeline-view';
import { Orientations } from './orientations';
import { State } from './state';
import { map } from 'rxjs/operators';
import { Orientation } from './orientation';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly margin = 50;

  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);
  private viewSubject = new BehaviorSubject<TimelineView>(null);
  private orientationsSubject = new BehaviorSubject<Orientations>({
    time: Orientation.Vertical,
    resource: Orientation.Horizontal
  });

  state$: Observable<State> = combineLatest([
    this.dataSubject.asObservable(),
    this.viewSubject.asObservable(),
    this.orientationsSubject.asObservable()
  ]).pipe(
    map(([data, view, orientations]) => ({
      data,
      view,
      orientations
    }))
  );

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

    this.orientationsSubject.next({
      time: timeOrientation,
      resource: resourceOrientation
    });
  }

  private flipOrientation(orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? Orientation.Horizontal
      : Orientation.Vertical;
  }
}
