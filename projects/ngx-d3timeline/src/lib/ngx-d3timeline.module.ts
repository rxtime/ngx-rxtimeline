import { NgModule } from '@angular/core';
import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { LineComponent } from './line.component';
import { ActivityRectangleComponent } from './content/activity-rectangle.component';
import { AxisTickMarkComponent } from './axis/axis-tick-mark.component';
import { AxisComponent } from './axis/axis-component';
import { ClipPathComponent } from './content/clip-path.component';

@NgModule({
  declarations: [
    NgxD3timelineComponent,
    ContentComponent,
    LineComponent,
    ActivityRectangleComponent,
    AxisTickMarkComponent,
    AxisComponent,
    ClipPathComponent
  ],
  imports: [CommonModule],
  exports: [NgxD3timelineComponent]
})
export class NgxD3timelineModule {}
