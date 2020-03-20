import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { ContentComponent } from './content/content.component';
import { ActivityRectangleComponent } from './content/activity-rectangle.component';
import { Store } from './store/store';
import { initialState } from './store/state';
import { of } from 'rxjs';
import { LineComponent } from './line.component';
import { AxisTickMarkComponent } from './axis/axis-tick-mark.component';
import { AxisComponent } from './axis/axis-component';
import { ClipPathComponent } from './content/clip-path.component';

describe('NgxD3timelineComponent', () => {
  let component: NgxD3timelineComponent;
  let fixture: ComponentFixture<NgxD3timelineComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxD3timelineComponent,
        ContentComponent,
        LineComponent,
        ActivityRectangleComponent,
        AxisTickMarkComponent,
        AxisComponent,
        ClipPathComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: { state$: jest.fn(), select: jest.fn() }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    store.state$ = of(initialState);
    store.select = () => of(null);
    fixture = TestBed.createComponent(NgxD3timelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
