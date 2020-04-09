import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxRxTimelineModule } from '../../projects/ngx-rxtimeline/src/public-api';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxRxTimelineModule, FormsModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
