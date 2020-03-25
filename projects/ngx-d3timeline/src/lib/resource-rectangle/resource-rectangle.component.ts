import { Component, Input } from '@angular/core';
import { ResourceRectangle } from './resource-rectangle';

@Component({
  selector: '[ngx-d3timeline-resource-rectangle]',
  template: `
    <svg:rect
      class="resource-rectangle"
      [attr.transform]="resourceRectangle.transform"
      [attr.width]="resourceRectangle.width"
      [attr.height]="resourceRectangle.height"
    ></svg:rect>
  `
})
export class ResourceRectangleComponent {
  @Input() resourceRectangle: ResourceRectangle;
}
