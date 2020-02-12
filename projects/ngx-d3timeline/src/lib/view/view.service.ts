import { Injectable } from '@angular/core';
import { TimelineView } from './timeline-view';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ViewService {
  readonly margin = 50;

  private viewSubject = new BehaviorSubject<[number, number]>(null);
  view$ = this.viewSubject.pipe(
    map(([width, height]) => new TimelineView(width, height, this.margin))
  );

  get rootTransform() {
    return `translate(${this.margin}, ${this.margin})`;
  }

  setView([width, height]: [number, number]) {
    this.viewSubject.next([width, height]);
  }
}
