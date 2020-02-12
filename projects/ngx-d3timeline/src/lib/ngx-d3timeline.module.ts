import { NgModule } from '@angular/core';
import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { SeriesAxisComponent } from './axis/series-axis.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxD3timelineComponent, SeriesAxisComponent],
  imports: [CommonModule],
  exports: [NgxD3timelineComponent]
})
export class NgxD3timelineModule {}
