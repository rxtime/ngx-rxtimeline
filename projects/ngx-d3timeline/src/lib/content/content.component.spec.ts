import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ContentService } from './content.service';
import { of } from 'rxjs';
import { ContentComponent } from './content.component';
import { Component, Input } from '@angular/core';
import { EventRectangle } from './content';

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let contentService: ContentService;
  let mockEventRectangles: EventRectangle[];

  @Component({
    selector: '[ngx-d3timeline-event-rectangle]',
    template: `
      <svg:g></svg:g>
    `
  })
  class FakeEventRectangleComponent {
    @Input() eventRectangle: EventRectangle;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentComponent, FakeEventRectangleComponent],
      providers: [{ provide: ContentService, useValue: jest.fn() }]
    });

    fixture = TestBed.createComponent(ContentComponent);
    contentService = TestBed.inject(ContentService);
    mockEventRectangles = [
      {
        id: 1,
        title: 'Event 1',
        transform: 'translate(50,0)',
        width: 50,
        height: 80
      },
      {
        id: 2,
        title: 'Event 2',
        transform: 'translate(130,0)',
        width: 60,
        height: 90
      }
    ];
  });

  describe('eventRectangles null', () => {
    beforeEach(() => {
      contentService.eventRectangles$ = of(null);
    });

    it('should not render', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('should not render when dragEventRectangle set', () => {
      contentService.dragEventRectangle$ = of(mockEventRectangles[0]);

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('should not render when previewEventRectangle set', () => {
      contentService.previewRectangle$ = of(mockEventRectangles[0]);

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });

  describe('eventRectangles set', () => {
    it('should render', () => {
      contentService.eventRectangles$ = of(mockEventRectangles);
      contentService.dragEventRectangle$ = of(mockEventRectangles[0]);
      contentService.previewRectangle$ = of(mockEventRectangles[0]);

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});
