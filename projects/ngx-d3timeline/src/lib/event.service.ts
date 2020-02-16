import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ScaleTime } from 'd3-scale';
import { Orientation } from './orientation';

@Injectable({ providedIn: 'root' })
export class EventService {
  private eventSubject = new BehaviorSubject<any>(null);

  event$ = this.eventSubject.asObservable();

  onEvent(event: any) {
    this.eventSubject.next(event);
  }

  getTransformedScale(
    scale: ScaleTime<number, number>,
    event: any,
    orientation: Orientation
  ) {
    return orientation === Orientation.Vertical
      ? event.transform.rescaleY(scale)
      : event.transform.rescaleX(scale);
  }
}
