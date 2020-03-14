import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { ResourcesAxisComponent } from './axis/resources-axis/resources-axis.component';
import { TimeAxisComponent } from './axis/time-axis/time-axis.component';
import { ContentComponent } from './content/content.component';
import { ActivityRectangleComponent } from './content/activity-rectangle.component';
import { Store } from './store/store';
import { initialState } from './store/state';
import { of } from 'rxjs';
import { LineComponent } from './line.component';
import { AxisTickMarkComponent } from './axis/axis-tick-mark.component';

describe('NgxD3timelineComponent', () => {
  let component: NgxD3timelineComponent;
  let fixture: ComponentFixture<NgxD3timelineComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxD3timelineComponent,
        ResourcesAxisComponent,
        TimeAxisComponent,
        ContentComponent,
        LineComponent,
        ActivityRectangleComponent,
        AxisTickMarkComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: { state$: jest.fn() }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    store.state$ = of(initialState);
    fixture = TestBed.createComponent(NgxD3timelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
