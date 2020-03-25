import { NgModule } from '@angular/core';
import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { LineComponent } from './line/line.component';
import { ActivityRectangleComponent } from './activity-rectangle/activity-rectangle.component';
import { AxisTickMarkComponent } from './tick-mark/axis-tick-mark.component';
import { AxisComponent } from './axis/axis-component';
import { ClipPathComponent } from './content/clip-path.component';
import { ResourceRectangleComponent } from './resource-rectangle/resource-rectangle.component';

@NgModule({
  declarations: [
    NgxD3timelineComponent,
    ContentComponent,
    LineComponent,
    ActivityRectangleComponent,
    AxisTickMarkComponent,
    AxisComponent,
    ClipPathComponent,
    ResourceRectangleComponent
  ],
  imports: [CommonModule],
  exports: [NgxD3timelineComponent]
})
export class NgxD3timelineModule {}
