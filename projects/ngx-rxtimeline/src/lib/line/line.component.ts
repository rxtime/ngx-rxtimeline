import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Line } from '../core/line';
@Component({
  selector: '[ngx-rxtimeline-line]',
  template: `
    <svg:line
      [attr.x1]="line.x1"
      [attr.x2]="line.x2"
      [attr.y1]="line.y1"
      [attr.y2]="line.y2"
    ></svg:line>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineComponent {
  @Input() line: Line;
}
