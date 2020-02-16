import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { ResourcesAxisViewModel } from './resources-axis/resources-axis-view-model';
import { ViewService } from './view/view.service';
import { TimeAxisViewModel } from './time-axis/time-axis-view-model';
import { EventService } from './event.service';
import { OptionsService } from './options.service';
import { ContentViewModel } from './content/content-view-model';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class AxisService {
  axis$ = combineLatest([
    this.dataService.data$,
    this.viewService.view$,
    this.optionsService.orientation$
  ]).pipe(
    switchMap(([data, timelineView, orientation]) =>
      this.eventService.event$.pipe(
        map(event => {
          const resourceAxisVm = new ResourcesAxisViewModel(
            data,
            timelineView,
            orientation
          );
          const timeAxisVm = new TimeAxisViewModel(
            data,
            timelineView,
            event,
            orientation
          );
          const contentVm = new ContentViewModel(
            data,
            timeAxisVm,
            resourceAxisVm
          );
          return {
            resourceAxisVm,
            timeAxisVm,
            contentVm
          };
        })
      )
    )
  );

  resourcesAxisVm$ = this.axis$.pipe(pluck('resourceAxisVm'));
  timeAxisVm$ = this.axis$.pipe(pluck('timeAxisVm'));
  contentVm$ = this.axis$.pipe(pluck('contentVm'));

  constructor(
    private viewService: ViewService,
    private eventService: EventService,
    private optionsService: OptionsService,
    private dataService: DataService
  ) {}
}
