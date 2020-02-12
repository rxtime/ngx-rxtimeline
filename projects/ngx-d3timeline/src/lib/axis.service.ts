import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimelineEvent } from './timeline-event';
import { SeriesAxisViewModel } from './axis/serie-axis-view-model';
import { ViewService } from './view/view.service';

@Injectable({ providedIn: 'root' })
export class AxisService {
  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);

  seriesAxisVm$ = this.dataSubject.pipe(
    map(data => new SeriesAxisViewModel(data, this.viewService.timelineView))
  );

  constructor(private viewService: ViewService) {}

  setData(data: TimelineEvent[]) {
    this.dataSubject.next(data);
  }
}