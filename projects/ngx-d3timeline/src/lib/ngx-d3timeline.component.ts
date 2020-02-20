import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { TimelineEvent } from './timeline-event';
import { zoom } from 'd3-zoom';
import { select, event } from 'd3-selection';
import { EventService } from './event.service';
import { Orientation } from './orientation';
import { Store } from './store';
import { ViewService } from './view/view.service';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg
      #svgEl
      *ngIf="(store.state$ | async).view as view"
      [attr.width]="view.width"
      [attr.height]="view.height"
      class="ngx-d3timeline"
    >
      <g [attr.transform]="viewService.rootTransform">
        <g ngx-d3timeline-resources-axis></g>
        <g ngx-d3timeline-time-axis></g>
        <g ngx-d3timeline-content></g>
      </g>
    </svg>
  `,
  styles: []
})
export class NgxD3timelineComponent implements AfterViewInit {
  @Input() set data(value: TimelineEvent[]) {
    this.store.setData(value);
  }

  @Input() set view([width, height]: [number, number]) {
    this.store.setView([width, height]);
  }

  @Input() set orientation(value: Orientation) {
    this.store.setTimeOrientation(value);
  }

  @ViewChild('svgEl') svgEl: ElementRef;

  constructor(
    private eventService: EventService,
    public store: Store,
    public viewService: ViewService
  ) {}

  ngAfterViewInit(): void {
    if (this.svgEl) {
      const onZoom = zoom().on('zoom', () => this.eventService.onEvent(event));
      onZoom(select(this.svgEl.nativeElement));
    }
  }
}
