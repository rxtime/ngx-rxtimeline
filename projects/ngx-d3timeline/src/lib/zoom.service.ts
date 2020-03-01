import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ZoomService {
  private zoomEventSubject = new BehaviorSubject<any>(null);

  zoom$ = this.zoomEventSubject.asObservable();

  onZoom(event: any) {
    this.zoomEventSubject.next(event);
  }
}
