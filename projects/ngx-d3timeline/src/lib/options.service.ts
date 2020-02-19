import { Injectable } from '@angular/core';
import { Orientation } from './orientation';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptionsService {
  private orientationSubject = new BehaviorSubject<Orientation>(
    Orientation.Vertical
  );

  orientation$ = this.orientationSubject.asObservable();

  setOrientation(orientation: Orientation) {
    this.orientationSubject.next(orientation);
  }

  flipOrientation(orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? Orientation.Horizontal
      : Orientation.Vertical;
  }

  getTranslation(range: number, orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? `translate(0, ${range})`
      : `translate(${range}, 0)`;
  }
}
