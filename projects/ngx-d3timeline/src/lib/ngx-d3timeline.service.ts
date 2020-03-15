import { Injectable, ElementRef } from '@angular/core';
import { Store } from './store/store';
import { selectView } from './store/state';
import { Activity } from './activity';
import * as fromActions from './store/actions';
import { Orientation } from './orientation';
import { zoom } from 'd3-zoom';
import { select, event } from 'd3-selection';

@Injectable({ providedIn: 'root' })
export class NgxD3TimelineService {
  view$ = this.store.select(selectView);

  constructor(private store: Store) {}

  setActivities(activities: Activity[]) {
    this.store.dispatch(new fromActions.ActivitiesChangedAction(activities));
  }

  setView([width, height]: [number, number]) {
    this.store.dispatch(new fromActions.ViewChangedAction([width, height]));
  }

  setTimeOrientation(timeOrientation: Orientation) {
    this.store.dispatch(
      new fromActions.OrientationChangedAction(timeOrientation)
    );
  }

  setupZoom(svgEl: ElementRef<SVGElement>) {
    if (svgEl) {
      const onZoom = zoom().on('zoom', this.zoomed.bind(this));
      onZoom(select(svgEl.nativeElement));
    }
  }

  private zoomed() {
    this.store.dispatch(new fromActions.ZoomedAction(event));
  }
}
