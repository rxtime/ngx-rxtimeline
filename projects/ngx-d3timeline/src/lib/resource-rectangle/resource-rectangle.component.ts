import { Component, Input } from '@angular/core';
import { ResourceRectangle } from './resource-rectangle';

@Component({
  selector: '[ngx-d3timeline-resource-rectangle]',
  template: `
    <svg:rect
      [attr.transform]="resourceRectangle.transform"
      [attr.width]="resourceRectangle.width"
      [attr.height]="resourceRectangle.height"
      [class.selected]="resourceRectangle.selected"
      [class.hovered]="resourceRectangle.hovered"
    ></svg:rect>
  `
})
export class ResourceRectangleComponent {
  @Input() resourceRectangle: ResourceRectangle;
}
