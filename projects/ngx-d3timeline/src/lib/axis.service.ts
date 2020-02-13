import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { TimelineEvent } from './timeline-event';
import { ResourcesAxisViewModel } from './resources-axis/resources-axis-view-model';
import { ViewService } from './view/view.service';
import { TimeAxisViewModel } from './time-axis/time-axis-view-model';
import { EventService } from './event.service';
import { OptionsService } from './options.service';

@Injectable({ providedIn: 'root' })
export class AxisService {
  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);

  axis$ = combineLatest([
    this.dataSubject,
    this.viewService.view$,
    this.optionsService.orientation$
  ]).pipe(
    switchMap(([data, timelineView, orientation]) =>
      this.eventService.event$.pipe(
        map(event => ({
          resourceAxisVm: new ResourcesAxisViewModel(
            data,
            timelineView,
            orientation
          ),
          timeAxisVm: new TimeAxisViewModel(
            data,
            timelineView,
            event,
            orientation
          )
        }))
      )
    )
  );

  resourcesAxisVm$ = this.axis$.pipe(pluck('resourceAxisVm'));
  timeAxisVm$ = this.axis$.pipe(pluck('timeAxisVm'));

  constructor(
    private viewService: ViewService,
    private eventService: EventService,
    private optionsService: OptionsService
  ) {}

  setData(data: TimelineEvent[]) {
    this.dataSubject.next(data);
  }
}
