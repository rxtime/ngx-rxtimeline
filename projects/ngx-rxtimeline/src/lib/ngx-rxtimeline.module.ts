import { NgModule } from '@angular/core';
import { NgxRxTimelineComponent } from './ngx-rxtimeline.component';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { LineComponent } from './line/line.component';
import { ActivityRectangleComponent } from './activity-rectangle/activity-rectangle.component';
import { TickMarkComponent } from './tick-mark/tick-mark.component';
import { AxisComponent } from './axis/axis-component';
import { ClipPathComponent } from './content/clip-path.component';
import { ResourceRectangleComponent } from './resource-rectangle/resource-rectangle.component';
import { ActivityContentComponent } from './activity-rectangle/activity-content.component';

@NgModule({
  declarations: [
    NgxRxTimelineComponent,
    ContentComponent,
    LineComponent,
    ActivityRectangleComponent,
    TickMarkComponent,
    AxisComponent,
    ClipPathComponent,
    ResourceRectangleComponent,
    ActivityContentComponent
  ],
  imports: [CommonModule],
  exports: [NgxRxTimelineComponent]
})
export class NgxRxTimelineModule {}
