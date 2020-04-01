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
import { selectHoveredActivity } from './hover/hover.selectors';
import { HoverAction } from './hover/hover-event';
import { selectResourceRectangles } from './resource-rectangle/resource-rectangle.selectors';
import { selectResourceShowRectangles } from './options/selectors/resource-options.selectors';
import { Subject, BehaviorSubject } from 'rxjs';
import { outputOnObservableEmit } from './core/observable-utils';

declare var ResizeObserver: any; // typings not yet available in Typescript
declare type ResizeObserver = any;

@Injectable()
export class NgxD3TimelineService implements OnDestroy {
  view$ = this.store.select(selectView);
  resourceAxis$ = this.axisService.resourceAxis$;
  timeAxis$ = this.axisService.timeAxis$;
  showRectangles$ = this.store.select(selectResourceShowRectangles);
  resizeObserver: ResizeObserver;
  resizes$ = new BehaviorSubject<[number, number]>([0, 0]);

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

  private destroySubject = new Subject<boolean>();

  constructor(private store: Store, private axisService: AxisService) {}

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
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

  private zoomed() {
    this.store.dispatch(new fromActions.ZoomedAction(event));
  }

  setupResizing(hostElement: ElementRef, changeDetector: ChangeDetectorRef) {
    this.resizes$
      .pipe(takeUntil(this.destroySubject), debounceTime(100))
      .subscribe(view => {
        this.setView(view);

        // possibly necessary due to current lack of monkey patching for ResizeObserver
        // https://dev.to/christiankohler/how-to-use-resizeobserver-with-angular-9l5
        changeDetector.detectChanges();
      });

    this.resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      this.resizes$.next([entry.contentRect.width, entry.contentRect.height]);
    });
    this.resizeObserver.observe(hostElement.nativeElement);
  }
}
