import { Injectable, ElementRef } from '@angular/core';
import { Store } from './store/store';
import { selectView } from './store/state';
import { Activity, getActivityFromPositionedActivity } from './activity';
import * as fromActions from './store/actions';
import { Orientation } from './orientation';
import { zoom } from 'd3-zoom';
import { select, event } from 'd3-selection';
import { AxisService } from './axis/axis.service';
import { map, filter, tap, distinctUntilChanged } from 'rxjs/operators';
import { selectLastDraggedActivity } from './content/selectors/activity.selectors';

@Injectable({ providedIn: 'root' })
export class NgxD3TimelineService {
  view$ = this.store.select(selectView);
  resourceAxis$ = this.axisService.resourceAxis$;
  timeAxis$ = this.axisService.timeAxis$;

  lastDraggedActivity$ = this.store.select(selectLastDraggedActivity).pipe(
    filter(activity => !!activity),
    distinctUntilChanged(),
    map(getActivityFromPositionedActivity)
  );

  constructor(private store: Store, private axisService: AxisService) {}

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
