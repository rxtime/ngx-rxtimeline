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
import {
  HoverAction,
  hoverEventComparer,
  HoverEvent,
  HoverSource
} from './hover/hover-event';
import {
  selectResourceRectangles,
  selectResourceTickRectangles
} from './resource-rectangle/selectors/resource-rectangle.selectors';
import { selectResourceShowRectangles } from './options/selectors/resource-options.selectors';
import { Subject, Observable } from 'rxjs';
import { outputOnObservableEmit } from './core/observable-utils';
import { findIdentifiable } from './core/identifiable-utils';
import { PositionedActivity } from './activity/positioned-activity';

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
    distinctUntilChanged(hoverEventComparer)
  );

  hoveredActivity$ = this.getHoveredActivityByHoverAction(HoverAction.Hovered);

  unhoveredActivity$ = this.getHoveredActivityByHoverAction(
    HoverAction.Unhovered
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

  resourceHovered(id: string) {
    this.store.dispatch(
      new fromActions.ResourceHoveredAction({ id, action: HoverAction.Hovered })
    );
  }

  resourceUnhovered(id: string) {
    this.store.dispatch(
      new fromActions.ResourceHoveredAction({
        id,
        action: HoverAction.Unhovered
      })
    );
  }

  onHovered(hovered: EventEmitter<Activity | string>) {
    outputOnObservableEmit(this.hoveredActivity$, this.destroySubject, hovered);
  }

  onUnhovered(unhovered: EventEmitter<Activity | string>) {
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

  private getHoveredActivityByHoverAction(
    hoverAction: HoverAction
  ): Observable<Activity | string> {
    return this.hoverEvent$.pipe(
      filter(hoverEvent => hoverEvent.action === hoverAction),
      withLatestFrom(this.store.select(selectPositionedActivities)),
      map(this.getHoveredSource)
    );
  }

  private getHoveredSource([hoverEvent, activities]: [
    HoverEvent,
    PositionedActivity[]
  ]) {
    return hoverEvent.source === HoverSource.Resource
      ? (hoverEvent.id as string)
      : getActivityFromPositionedActivity(
          findIdentifiable(activities, hoverEvent.id)
        );
  }

  private zoomed() {
    this.store.dispatch(new fromActions.ZoomedAction(event));
  }
}
