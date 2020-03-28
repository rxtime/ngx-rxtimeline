import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Activity } from './activity/activity';

import { NgxD3TimelineService } from './ngx-d3timeline.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Options } from './options/options';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg
      #svgEl
      *ngIf="timeline.view$ | async as view"
      [attr.width]="view.width"
      [attr.height]="view.height"
      class="ngx-d3timeline"
    >
      <g
        ngx-d3timeline-axis
        class="resources-axis"
        [axis]="timeline.resourceAxis$ | async"
      ></g>
      <g
        ngx-d3timeline-resource-rectangle
        *ngFor="let resourceRectangle of timeline.resourceRectangles$ | async"
        [resourceRectangle]="resourceRectangle"
      ></g>
      <g
        ngx-d3timeline-axis
        class="time-axis"
        [axis]="timeline.timeAxis$ | async"
      ></g>
      <g ngx-d3timeline-content></g>
    </svg>
  `,
  styleUrls: ['./ngx-d3timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxD3timelineComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() set activities(value: Activity[]) {
    this.timeline.setActivities(value);
  }

  @Input() set view([width, height]: [number, number]) {
    this.timeline.setView([width, height]);
  }

  @Input() set options(options: Options) {
    this.timeline.setOptions(options);
  }

  @Output() activityDropped = new EventEmitter<Activity>();
  @Output() hovered = new EventEmitter<Activity>();
  @Output() unhovered = new EventEmitter<Activity>();

  @ViewChild('svgEl') svgEl: ElementRef<SVGElement>;

  destroy$ = new Subject<boolean>();

  constructor(public timeline: NgxD3TimelineService) {}

  ngOnInit(): void {
    this.observableToOutputMap.forEach(this.outputOnObservableEmit.bind(this));
  }

  ngAfterViewInit(): void {
    this.timeline.setupZoom(this.svgEl);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private get observableToOutputMap(): [Observable<any>, EventEmitter<any>][] {
    return [
      [this.timeline.hoveredActivity$, this.hovered],
      [this.timeline.unhoveredActivity$, this.unhovered],
      [this.timeline.activityDropped$, this.activityDropped]
    ];
  }

  private outputOnObservableEmit<T>([observable$, output]: [
    Observable<T>,
    EventEmitter<T>
  ]) {
    console.log(observable$);
    observable$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => output.emit(value));
  }
}
