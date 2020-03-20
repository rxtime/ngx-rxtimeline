import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { selectTimeAxis, selectResourceAxis } from './axis.selectors';

@Injectable({ providedIn: 'root' })
export class AxisService {
  resourceAxis$ = this.store.select(selectResourceAxis);

  timeAxis$ = this.store.select(selectTimeAxis);

  constructor(private store: Store) {}
}
