import { BehaviorSubject } from 'rxjs';
import { TimelineEvent } from '../public-api';

export class DataService {
  private dataSubject = new BehaviorSubject<TimelineEvent[]>(null);

  data$ = this.dataSubject.asObservable();

  setData(data: TimelineEvent[]) {
    this.dataSubject.next(data);
  }
}
