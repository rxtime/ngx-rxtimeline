import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxRxTimelineModule } from 'ngx-rxtimeline';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxRxTimelineModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
