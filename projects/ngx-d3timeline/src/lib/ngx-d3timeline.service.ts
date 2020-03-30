import { Injectable, ElementRef, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from './store-lib/store';
import { selectView } from './store/state';
import {
  Activity,
  getActivityFromPositionedActivity
} from './activity/activity';
import * as fromActions from './store/actions';
import { Options } from './options/options';
import { zoom } from 'd3-zoom';
import { select, event } from 'd3-selection';
import { AxisService } from './axis/axis.service';
import { map, filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { selectLastDraggedActivity } from './activity/activity.selectors';

import {
  selectResourceRectangles,
  selectResourceTickRectangles
} from './resource-rectangle/selectors/resource-rectangle.selectors';
import { selectResourceShowRectangles } from './options/selectors/resource-options.selectors';
import { Subject } from 'rxjs';

@Injectable()
export class NgxD3TimelineService implements OnDestroy {
  view$ = this.store.select(selectView);
  resourceAxis$ = this.axisService.resourceAxis$;
  timeAxis$ = this.axisService.timeAxis$;
  showRectangles$ = this.store.select(selectResourceShowRectangles);

  activityDropped$ = this.store.select(selectLastDraggedActivity).pipe(
    filter(activity => !!activity),
    distinctUntilChanged(),
    map(getActivityFromPositionedActivity)
  );

  resourceRectangles$ = this.store.select(selectResourceRectangles);
  resourceTickMarkRectangles$ = this.store.select(selectResourceTickRectangles);

  private destroySubject = new Subject<boolean>();

  constructor(private store: Store, private axisService: AxisService) {}

  ngOnDestroy(): void {
    this.destroySubject.next(true);
  }

  setActivities(activities: Activity[]) {
    this.store.dispatch(new fromActions.ActivitiesChangedAction(activities));
  }

  setView([width, height]: [number, number]) {
    this.store.dispatch(new fromActions.ViewChangedAction([width, height]));
  }

  setOptions(options: Options) {
    this.store.dispatch(new fromActions.OptionsChangedAction(options));
  }

  setupZoom(svgEl: ElementRef<SVGElement>) {
    if (svgEl) {
      const onZoom = zoom().on('zoom', this.zoomed.bind(this));
      onZoom(select(svgEl.nativeElement));
    }
  }

  onActivityDropped(activityDropped: EventEmitter<Activity>) {
    this.activityDropped$
      .pipe(takeUntil(this.destroySubject))
      .subscribe(activity => activityDropped.emit(activity));
  }

  private zoomed() {
    this.store.dispatch(new fromActions.ZoomedAction(event));
  }
}
