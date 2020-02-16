import { BehaviorSubject } from 'rxjs';
import { TimelineEvent } from '../public-api';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);

  data$ = this.dataSubject.asObservable();

  setData(data: TimelineEvent[]) {
    this.dataSubject.next(data);
  }
}
