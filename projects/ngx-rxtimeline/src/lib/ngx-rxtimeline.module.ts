import { NgModule } from '@angular/core';
import { NgxrxtimelineComponent } from './ngx-rxtimeline.component';
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
    NgxrxtimelineComponent,
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
  exports: [NgxrxtimelineComponent]
})
export class NgxrxtimelineModule {}
