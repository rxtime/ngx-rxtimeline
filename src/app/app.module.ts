import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxD3timelineModule } from 'ngx-d3timeline';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxD3timelineModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
