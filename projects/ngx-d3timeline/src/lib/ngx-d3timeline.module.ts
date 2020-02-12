import { NgModule } from '@angular/core';
import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { ResourcesAxisComponent } from './axis/resources-axis.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxD3timelineComponent, ResourcesAxisComponent],
  imports: [CommonModule],
  exports: [NgxD3timelineComponent]
})
export class NgxD3timelineModule {}
