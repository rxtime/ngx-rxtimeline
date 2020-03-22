import { Injectable, ElementRef } from '@angular/core';
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
import { HoverType } from './hover/hover-event';

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

  hoveredActivity$ = this.store
    .select(selectHoveredActivity(HoverType.Hovered))
    .pipe(filter(activity => !!activity));

  unhoveredActivity$ = this.store
    .select(selectHoveredActivity(HoverType.Unhovered))
    .pipe(filter(activity => !!activity));

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

  private zoomed() {
    this.store.dispatch(new fromActions.ZoomedAction(event));
  }
}
