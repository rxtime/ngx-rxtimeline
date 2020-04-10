import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgxRxTimelineModule } from 'ngx-rxtimeline';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';
import { TimelineComponent } from './timeline/timeline.component';
import { CssGridLayoutComponent } from './layouts/css-grid-layout.component';
import { BasicLayoutComponent } from './layouts/basic-layout.component';

const routes: Routes = [
  { path: 'basic', component: BasicLayoutComponent },
  { path: 'grid', component: CssGridLayoutComponent },
  { path: '', redirectTo: 'basic', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    BasicLayoutComponent,
    CssGridLayoutComponent,
    OptionsComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    NgxRxTimelineModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
