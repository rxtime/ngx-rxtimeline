import { Injectable, ElementRef, OnDestroy } from '@angular/core';
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
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { selectLastDraggedActivity } from './activity/activity.selectors';
import { selectHoveredActivity } from './hover/hover.selectors';
import { HoverAction } from './hover/hover-event';
import { selectResourceRectangles } from './resource-rectangle/resource-rectangle.selectors';
import { Subject } from 'rxjs';
import {
  ObservableOutputMap,
  setupObservableToOutputMappings
} from './core/observable-output-map';

@Injectable({ providedIn: 'root' })
export class NgxD3TimelineService implements OnDestroy {
  destroy$ = new Subject<boolean>();
  view$ = this.store.select(selectView);
  resourceAxis$ = this.axisService.resourceAxis$;
  timeAxis$ = this.axisService.timeAxis$;

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

  constructor(private store: Store, private axisService: AxisService) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
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

  private zoomed() {
    this.store.dispatch(new fromActions.ZoomedAction(event));
  }

  setupOutputs(observableToOutputMappings: ObservableOutputMap<Activity>[]) {
    setupObservableToOutputMappings(observableToOutputMappings, this.destroy$);
  }
}
