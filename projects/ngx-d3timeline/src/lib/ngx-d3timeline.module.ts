import { NgModule } from '@angular/core';
import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { ResourcesAxisComponent } from './axis/resources-axis/resources-axis.component';
import { CommonModule } from '@angular/common';
import { TimeAxisComponent } from './axis/time-axis/time-axis.component';
import { ContentComponent } from './content/content.component';
import { AxisLineComponent } from './axis/axis-line/axis-line.component';

@NgModule({
  declarations: [
    NgxD3timelineComponent,
    ResourcesAxisComponent,
    TimeAxisComponent,
    ContentComponent,
    AxisLineComponent
  ],
  imports: [CommonModule],
  exports: [NgxD3timelineComponent]
})
export class NgxD3timelineModule {}
