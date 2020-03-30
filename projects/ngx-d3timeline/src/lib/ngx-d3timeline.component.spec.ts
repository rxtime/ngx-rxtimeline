import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Axis } from './axis/axis';
import { NgxD3TimelineService } from './ngx-d3timeline.service';
import { View } from './view/view';
import { ResourceRectangle } from './resource-rectangle/resource-rectangle';

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

@Component({
  selector: '[ngx-d3timeline-resource-rectangle]',
  template: `
    <svg:rect></svg:rect>
  `
})
class FakeResourceRectangleComponent {
  @Input() resourceRectangle: ResourceRectangle;
}

describe('NgxD3timelineComponent', () => {
  let component: NgxD3timelineComponent;
  let fixture: ComponentFixture<NgxD3timelineComponent>;
  let timeline: NgxD3TimelineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxD3timelineComponent,
        FakeContentComponent,
        FakeAxisComponent,
        FakeResourceRectangleComponent
      ],
      providers: [
        {
          provide: NgxD3TimelineService,
          useValue: {
            timeAxis$: jest.fn(),
            resourceAxis$: jest.fn(),
            content$: jest.fn(),
            lastDraggedActivity$: jest.fn(),
            hoveredActivity$: jest.fn(),
            unhoveredActivity$: jest.fn(),
            resourceRectangles$: jest.fn(),
            resourceTickMarkRectangles$: jest.fn(),
            setupZoom: jest.fn(),
            onActivityDropped: jest.fn(),
            onHovered: jest.fn(),
            onUnhovered: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxD3timelineComponent);
    timeline = fixture.debugElement.injector.get(NgxD3TimelineService);
    timeline.activityDropped$ = of(null);
    timeline.hovered$ = of(null);
    timeline.unhovered$ = of(null);

    component = fixture.componentInstance;
  });

  it('should not render if view null', () => {
    timeline.view$ = of(null);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  describe('view not null', () => {
    beforeEach(() => {
      const mockRectangles = [
        {
          id: 'resource1',
          width: 10,
          height: 10,
          transform: 'translate(50,50'
        },
        { id: 'resource2', width: 10, height: 10, transform: 'translate(50,50' }
      ];

      timeline.view$ = of(new View([800, 600]));
      timeline.resourceAxis$ = of(null);
      timeline.timeAxis$ = of(null);
      timeline.showRectangles$ = of(true);
      timeline.resourceRectangles$ = of(mockRectangles);
      timeline.resourceTickMarkRectangles$ = of(mockRectangles);
    });

    it('should render correctly', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('should not render resource rectangles when showRectangles$ false', () => {
      timeline.showRectangles$ = of(false);

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});
