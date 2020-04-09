import { Component, Input } from '@angular/core';
import { ActivityContent } from './activity-content';

@Component({
  selector: '[ngx-rxtimeline-activity-content]',
  template: `
    <svg:foreignObject
      [attr.width]="content.width"
      [attr.height]="content.height"
      [attr.transform]="content.transform"
      class="activity-content"
    >
      <xhtml:div
        class="activity-content-div"
        [style.font-size]="content.fontSize"
        [style.font-family]="content.fontFace"
      >
        <span class="activity-content-title">
          {{ content.title }}
        </span>
        <span class="activity-content-description">
          {{ content.description }}
        </span>
      </xhtml:div>
    </svg:foreignObject>
  `
})
export class ActivityContentComponent {
  @Input() content: ActivityContent;
}
