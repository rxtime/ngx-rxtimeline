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
}
