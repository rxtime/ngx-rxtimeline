import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { ContentComponent } from './content/content.component';
import { ActivityRectangleComponent } from './content/activity-rectangle.component';
import { Store } from './store-lib/store';
import { initialState } from './store/state';
import { of } from 'rxjs';
import { LineComponent } from './line.component';
import { AxisTickMarkComponent } from './axis/axis-tick-mark.component';
import { ClipPathComponent } from './content/clip-path.component';
import { Component, Input } from '@angular/core';
import { Axis } from './axis/axis';
import { NgxD3TimelineService } from './ngx-d3timeline.service';
import { View } from './view/view';

@Component({
  selector: '[ngx-d3timeline-axis]',
  template: `
    <svg:g class="axis-group"></svg:g>
  `
})
class FakeAxisComponent {
  @Input() axis: Axis;
}

@Component({
  selector: '[ngx-d3timeline-content]',
  template: `
    <svg:g class="content"></svg:g>
  `
})
class FakeContentComponent {}

describe('NgxD3timelineComponent', () => {
  let component: NgxD3timelineComponent;
  let fixture: ComponentFixture<NgxD3timelineComponent>;
  let timeline: NgxD3TimelineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxD3timelineComponent,
        FakeContentComponent,
        FakeAxisComponent
      ],
      providers: [
        {
          provide: NgxD3TimelineService,
          useValue: {
            timeAxis$: jest.fn(),
            resourceAxis$: jest.fn(),
            content$: jest.fn(),
            lastDraggedActivity$: jest.fn(),
            setupZoom: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxD3timelineComponent);
    timeline = TestBed.inject(NgxD3TimelineService);
    timeline.lastDraggedActivity$ = of(null);

    component = fixture.componentInstance;
  });

  it('should not render if view null', () => {
    timeline.view$ = of(null);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render correctly', () => {
    timeline.view$ = of(new View([800, 600]));
    timeline.resourceAxis$ = of(null);
    timeline.timeAxis$ = of(null);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
