import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxD3timelineModule } from '@caci/ngx-d3timeline';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxD3timelineModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
