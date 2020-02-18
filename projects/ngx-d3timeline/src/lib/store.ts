import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { TimelineEvent } from './timeline-event';
import { TimelineView } from './view/timeline-view';
import { Orientation } from './orientation';
import { State } from './state';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly margin = 50;

  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);
  private viewSubject = new BehaviorSubject<TimelineView>(null);
  private orientationSubject = new BehaviorSubject<Orientation>(
    Orientation.Vertical
  );

  state$: Observable<State> = combineLatest([
    this.dataSubject.asObservable(),
    this.viewSubject.asObservable(),
    this.orientationSubject.asObservable()
  ]).pipe(
    map(([data, view, timelineOrientation]) => ({
      data,
      view,
      timelineOrientation
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

  setOrientation(orientation: Orientation) {
    this.orientationSubject.next(orientation);
  }
}
