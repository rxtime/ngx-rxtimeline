import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxD3timelineModule } from '../../projects/ngx-d3timeline/src/public-api';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxD3timelineModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
