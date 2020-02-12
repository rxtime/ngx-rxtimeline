import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { TimelineEvent } from './timeline-event';
import { ResourcesAxisViewModel } from './axis/resources-axis-view-model';
import { ViewService } from './view/view.service';
import { TimeAxisViewModel } from './axis/time-axis-view-model';

@Injectable({ providedIn: 'root' })
export class AxisService {
  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);

  axis$ = combineLatest(this.dataSubject, this.viewService.view$).pipe(
    map(([data, timelineView]) => ({
      resourceAxisVm: new ResourcesAxisViewModel(data, timelineView),
      timeAxisVm: new TimeAxisViewModel(data, timelineView)
    }))
  );

  resourcesAxisVm$ = this.axis$.pipe(pluck('resourceAxisVm'));
  timeAxisVm$ = this.axis$.pipe(pluck('timeAxisVm'));

  constructor(private viewService: ViewService) {}

  setData(data: TimelineEvent[]) {
    this.dataSubject.next(data);
  }
}
