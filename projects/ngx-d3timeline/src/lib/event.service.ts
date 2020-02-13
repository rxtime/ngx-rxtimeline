import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventService {
  private eventSubject = new BehaviorSubject<any>(null);

  event$ = this.eventSubject.asObservable();

  onEvent(event: any) {
    this.eventSubject.next(event);
  }
}
