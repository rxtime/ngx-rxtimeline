import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NgxRxTimelineModule } from '../../projects/ngx-rxtimeline/src/public-api';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from './options/options.component';
import { CssGridLayoutComponent } from './layouts/css-grid-layout.component';
import { BasicLayoutComponent } from './layouts/basic-layout.component';
import { TimelineComponent } from './timeline/timeline.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        OptionsComponent,
        CssGridLayoutComponent,
        BasicLayoutComponent,
        TimelineComponent
      ],
      imports: [NgxRxTimelineModule, FormsModule, RouterTestingModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
