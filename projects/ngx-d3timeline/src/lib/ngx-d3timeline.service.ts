import {
  Injectable,
  ElementRef,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
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
import {
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import { selectLastDraggedActivity } from './activity/activity.selectors';

import {
  selectResourceRectangles,
  selectResourceTickRectangles
} from './resource-rectangle/selectors/resource-rectangle.selectors';
import { Subject } from 'rxjs';
import { identifier } from './core/types';
import { createResizeObservable } from './core/resize-observable';

@Injectable()
export class NgxD3TimelineService implements OnDestroy {
  view$ = this.store.select(selectView);
  resourceAxis$ = this.axisService.resourceAxis$;
  timeAxis$ = this.axisService.timeAxis$;

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

  setSelectedId(id: identifier) {
    this.store.dispatch(new fromActions.SelectedIdChangedAction(id));
  }

  setHoveredId(id: identifier) {
    this.store.dispatch(new fromActions.HoveredIdChangedAction(id));
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

  setupResizing(hostElement: ElementRef, changeDetector: ChangeDetectorRef) {
    const resizes$ = createResizeObservable(hostElement.nativeElement);

    resizes$
      .pipe(takeUntil(this.destroySubject), debounceTime(100))
      .subscribe(view => {
        this.setView(view);

        // possibly necessary due to current lack of monkey patching for ResizeObserver
        // https://dev.to/christiankohler/how-to-use-resizeobserver-with-angular-9l5
        changeDetector.detectChanges();
      });
  }
}
