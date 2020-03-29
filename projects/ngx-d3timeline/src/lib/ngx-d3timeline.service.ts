import { Injectable, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from './store-lib/store';
import {
  selectView,
  selectHoverEvent,
  selectPositionedActivities
} from './store/state';
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
  withLatestFrom
} from 'rxjs/operators';
import { selectLastDraggedActivity } from './activity/activity.selectors';
import { HoverAction, hoverEventComparator } from './hover/hover-event';
import { selectResourceRectangles } from './resource-rectangle/resource-rectangle.selectors';
import { selectResourceShowRectangles } from './options/selectors/resource-options.selectors';
import { Subject } from 'rxjs';
import { outputOnObservableEmit } from './core/observable-utils';
import { findIdentifiable } from './core/identifiable-utils';

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

  hoverEvent$ = this.store.select(selectHoverEvent).pipe(
    filter(activity => !!activity),
    distinctUntilChanged(hoverEventComparator)
  );

  hoveredActivity$ = this.getHoveredActivityByHoverType(HoverAction.Hovered);

  unhoveredActivity$ = this.getHoveredActivityByHoverType(
    HoverAction.Unhovered
  );

  resourceRectangles$ = this.store.select(selectResourceRectangles);

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

  onHovered(hovered: EventEmitter<Activity>) {
    outputOnObservableEmit(this.hoveredActivity$, this.destroySubject, hovered);
  }

  onUnhovered(unhovered: EventEmitter<Activity>) {
    outputOnObservableEmit(
      this.unhoveredActivity$,
      this.destroySubject,
      unhovered
    );
  }

  onActivityDropped(activityDropped: EventEmitter<Activity>) {
    outputOnObservableEmit(
      this.activityDropped$,
      this.destroySubject,
      activityDropped
    );
  }

  private getHoveredActivityByHoverType(hoverAction: HoverAction) {
    return this.hoverEvent$.pipe(
      filter(hoverEvent => hoverEvent.action === hoverAction),
      withLatestFrom(this.store.select(selectPositionedActivities)),
      map(([hoverEvent, activities]) =>
        findIdentifiable(activities, hoverEvent.id)
      ),
      map(getActivityFromPositionedActivity)
    );
  }

  private zoomed() {
    this.store.dispatch(new fromActions.ZoomedAction(event));
  }
}
