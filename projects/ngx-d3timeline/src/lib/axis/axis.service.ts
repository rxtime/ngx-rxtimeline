import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { selectResourceAxis } from './resources-axis/resources-axis-utils';
import { selectTimeAxis } from './time-axis/time-axis-utils';

@Injectable({ providedIn: 'root' })
export class AxisService {
  resourceAxis$ = this.store.select(selectResourceAxis);
  timeAxis$ = this.store.select(selectTimeAxis);

  constructor(private store: Store) {}
}
