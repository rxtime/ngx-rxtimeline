import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimelineEvent } from './timeline-event';

@Injectable({ providedIn: 'root' })
export class ScaleService {
  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);

  setData(data: TimelineEvent[]) {
    this.dataSubject.next(data);
  }
}
