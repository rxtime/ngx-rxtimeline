import { Injectable } from '@angular/core';
import { Orientation } from './orientation';

@Injectable({ providedIn: 'root' })
export class OptionsService {
  getTranslation(range: number, orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? `translate(0, ${range})`
      : `translate(${range}, 0)`;
  }
}
