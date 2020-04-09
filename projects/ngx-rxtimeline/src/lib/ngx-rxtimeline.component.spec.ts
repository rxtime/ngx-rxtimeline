import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxrxtimelineComponent } from './ngx-rxtimeline.component';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Axis } from './axis/axis';
import { NgxrxtimelineService } from './ngx-rxtimeline.service';
import { View } from './view/view';
import { ResourceRectangle } from './resource-rectangle/resource-rectangle';

Object.defineProperty(window, 'ResizeObserver', {
  value: jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }))
});

@Component({
  selector: '[ngx-rxtimeline-axis]',
  template: `
    <svg:g class="axis-group"></svg:g>
  `
})
class FakeAxisComponent {
  @Input() axis: Axis;
}

@Component({
  selector: '[ngx-rxtimeline-content]',
  template: `
    <svg:g class="content"></svg:g>
  `
})
class FakeContentComponent {}

@Component({
  selector: '[ngx-rxtimeline-resource-rectangle]',
  template: `
    <svg:rect></svg:rect>
  `
})
class FakeResourceRectangleComponent {
  @Input() resourceRectangle: ResourceRectangle;
}

describe('NgxrxtimelineComponent', () => {
  let component: NgxrxtimelineComponent;
  let fixture: ComponentFixture<NgxrxtimelineComponent>;
  let timeline: NgxrxtimelineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxrxtimelineComponent,
        FakeContentComponent,
        FakeAxisComponent,
        FakeResourceRectangleComponent
      ],
      providers: [
        {
          provide: NgxrxtimelineService,
          useValue: {
            timeAxis$: jest.fn(),
            resourceAxis$: jest.fn(),
            content$: jest.fn(),
            lastDraggedActivity$: jest.fn(),
            resourceRectangles$: jest.fn(),
            resourceTickMarkRectangles$: jest.fn(),
            setupZoom: jest.fn(),
            setupResizing: jest.fn(),
            onActivityDropped: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxrxtimelineComponent);
    timeline = fixture.debugElement.injector.get(NgxrxtimelineService);
    timeline.activityDropped$ = of(null);

    component = fixture.componentInstance;
  });

  it('should not render if view null', () => {
    timeline.view$ = of(null);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  describe('view not null', () => {
    beforeEach(() => {
      const mockRectangles: ResourceRectangle[] = [
        {
          id: 'resource1',
          width: 10,
          height: 10,
          transform: 'translate(50,50',
          hovered: true,
          selected: true
        },
        {
          id: 'resource2',
          width: 10,
          height: 10,
          transform: 'translate(50,50',
          hovered: false,
          selected: false
        }
      ];

      timeline.view$ = of({ width: 800, height: 600 });
      timeline.resourceAxis$ = of(null);
      timeline.timeAxis$ = of(null);
      timeline.resourceRectangles$ = of(mockRectangles);
      timeline.resourceTickMarkRectangles$ = of(mockRectangles);
    });

    it('should render correctly', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});
