import { Store } from './store';
import { Injectable } from '@angular/core';
import { ScaleBandService } from './scale-band.service';
import { map, share } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScalesService {
  scales$ = this.store.state$.pipe(
    map(state => ({
      scaleBand: this.scaleBandService.configureScaleBand(state),
      state
    })),
    share()
  );

  constructor(
    private store: Store,
    private scaleBandService: ScaleBandService
  ) {}
}
