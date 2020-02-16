import { TimelineView } from '../view/timeline-view';
import { DataService } from '../data.service';
import { combineLatest } from 'rxjs';
import { ViewService } from '../view/view.service';
import { map } from 'rxjs/operators';
import { Orientation } from '../orientation';
import { scaleTime } from 'd3-scale';
import { TimelineEvent } from '../../public-api';
import { min, max } from 'd3-array';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScaleTimeService {
  scaleTime$ = combineLatest([
    this.dataService.data$,
    this.viewService.view$
  ]).pipe(map(([data, view]) => this.scaleTime(data, view)));

  constructor(
    private dataService: DataService,
    private viewService: ViewService
  ) {}

  private scaleTime = (data: TimelineEvent[], timelineView: TimelineView) => (
    orientation: Orientation
  ) =>
    scaleTime()
      .domain([min(data, d => d.start), max(data, d => d.finish)])
      .range(this.getRange(timelineView.bounds, orientation));

  private getRange(bounds: any, orientation: Orientation) {
    return orientation === Orientation.Vertical
      ? [bounds.top, bounds.bottom]
      : [bounds.left, bounds.right];
  }
}
