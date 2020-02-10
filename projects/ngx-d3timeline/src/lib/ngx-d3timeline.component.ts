import { Component, Input } from '@angular/core';
import { TimelineEvent } from './timeline-event';
import { View } from './view';

@Component({
  selector: 'ngx-d3timeline',
  template: `
    <svg [attr.width]="view.width" [attr.height]="view.height"></svg>
  `,
  styles: []
})
export class NgxD3timelineComponent {
  @Input() data: TimelineEvent[];

  view: View = {
    width: 400,
    height: 600,
    margin: 50
  };
}
