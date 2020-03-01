import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateWithScales, TimeScale } from './types';
import { Orientation } from './orientation';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ZoomService {
  private zoomEventSubject = new BehaviorSubject<any>(null);

  zoom$ = this.zoomEventSubject.asObservable();

  onZoom(event: any) {
    this.zoomEventSubject.next(event);
  }

  rescale(stateWithScales: StateWithScales) {
    return this.zoom$.pipe(
      map(zoomEvent =>
        zoomEvent
          ? {
              ...stateWithScales,
              timeScale: this.rescaleTime(stateWithScales, zoomEvent)
            }
          : stateWithScales
      )
    );
  }

  private rescaleTime(stateWithScales: StateWithScales, event: any): TimeScale {
    return stateWithScales.axisOrientations.time === Orientation.Vertical
      ? event.transform.rescaleY(stateWithScales.timeScale)
      : event.transform.rescaleX(stateWithScales.timeScale);
  }
}
