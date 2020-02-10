import { Component, Input } from '@angular/core';
import { TimelineEvent } from './timeline-event';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg></svg>
  `,
  styles: []
})
export class NgxD3timelineComponent {
  @Input() data: TimelineEvent[];
}
