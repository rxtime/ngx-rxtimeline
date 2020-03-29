import { Injectable, ElementRef, EventEmitter } from '@angular/core';
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
import { selectHoveredActivity } from './hover/hover.selectors';
import { HoverAction } from './hover/hover-event';
import { selectResourceRectangles } from './resource-rectangle/resource-rectangle.selectors';
import { selectResourceShowRectangles } from './options/selectors/resource-options.selectors';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgxD3TimelineService {
  view$ = this.store.select(selectView);
  resourceAxis$ = this.axisService.resourceAxis$;
  timeAxis$ = this.axisService.timeAxis$;
  showRectangles$ = this.store.select(selectResourceShowRectangles);

  activityDropped$ = this.store.select(selectLastDraggedActivity).pipe(
    filter(activity => !!activity),
    distinctUntilChanged(),
    map(getActivityFromPositionedActivity)
  );

  hoveredActivity$ = this.store
    .select(selectHoveredActivity(HoverAction.Hovered))
    .pipe(filter(activity => !!activity));

  unhoveredActivity$ = this.store
    .select(selectHoveredActivity(HoverAction.Unhovered))
    .pipe(filter(activity => !!activity));

  resourceRectangles$ = this.store.select(selectResourceRectangles);

  private deystroySubject = new Subject<boolean>();

  constructor(private store: Store, private axisService: AxisService) {}

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

  componentDestroyed() {
    this.deystroySubject.next(true);
  }

  onHovered(hovered: EventEmitter<Activity>) {
    this.outputOnObservableEmit(this.hoveredActivity$, hovered);
  }

  onUnhovered(unhovered: EventEmitter<Activity>) {
    this.outputOnObservableEmit(this.unhoveredActivity$, unhovered);
  }

  onActivityDropped(activityDropped: EventEmitter<Activity>) {
    this.outputOnObservableEmit(this.activityDropped$, activityDropped);
  }

  private outputOnObservableEmit<T>(
    observable$: Observable<T>,
    output: EventEmitter<T>
  ) {
    observable$
      .pipe(takeUntil(this.deystroySubject))
      .subscribe(value => output.emit(value));
  }

  private zoomed() {
    this.store.dispatch(new fromActions.ZoomedAction(event));
  }
}
