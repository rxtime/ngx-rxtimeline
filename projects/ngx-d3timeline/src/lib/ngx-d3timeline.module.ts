import { NgModule } from '@angular/core';
import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { ResourcesAxisComponent } from './axis/resources-axis/resources-axis.component';
import { CommonModule } from '@angular/common';
import { TimeAxisComponent } from './axis/time-axis/time-axis.component';
import { ContentComponent } from './content/content.component';
import { LineComponent } from './line.component';
import { ActivityRectangleComponent } from './content/activity-rectangle.component';

@NgModule({
  declarations: [
    NgxD3timelineComponent,
    ResourcesAxisComponent,
    TimeAxisComponent,
    ContentComponent,
    LineComponent,
    ActivityRectangleComponent
  ],
  imports: [CommonModule],
  exports: [NgxD3timelineComponent]
})
export class NgxD3timelineModule {}
