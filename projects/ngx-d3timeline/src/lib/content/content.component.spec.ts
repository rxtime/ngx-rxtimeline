import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ContentService } from './content.service';
import { of } from 'rxjs';
import { ContentComponent } from './content.component';
import { Component, Input } from '@angular/core';
import { ActivityRectangle } from '../activity-rectangle/activity-rectangle';
import { Rectangle } from '../core/rectangle';

@Component({
  selector: '[ngx-d3timeline-clip-path]',
  template: `
    <svg:g></svg:g>
  `
})
class FakeClipPathComponent {
  @Input() clipRect: Rectangle;
}

@Component({
  selector: '[ngx-d3timeline-activity-rectangle]',
  template: `
    <svg:g></svg:g>
  `
})
class FakeActivityRectangleComponent {
  @Input() activityRectangle: ActivityRectangle;
}

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let contentService: ContentService;
  let mockActivityRectangles: ActivityRectangle[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentComponent,
        FakeActivityRectangleComponent,
        FakeClipPathComponent
      ],
      providers: [{ provide: ContentService, useValue: jest.fn() }]
    });

    fixture = TestBed.createComponent(ContentComponent);
    contentService = TestBed.inject(ContentService);
    mockActivityRectangles = [
      {
        id: 1,
        title: 'Activity 1',
        transform: 'translate(50,0)',
        type: 'Driving',
        width: 50,
        height: 80,
        fontSize: 10,
        showTitle: true,
        fontFace: 'Arial'
      },
      {
        id: 2,
        title: 'Activity 2',
        transform: 'translate(130,0)',
        type: 'Driving',
        width: 60,
        height: 90,
        fontSize: 10,
        showTitle: true,
        fontFace: 'Arial'
      }
    ];
  });

  describe('activityRectangles null', () => {
    beforeEach(() => {
      contentService.activityRectangles$ = of(null);
    });

    it('should not render', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('should not render when draggingRectangle set', () => {
      contentService.draggingRectangle$ = of(mockActivityRectangles[0]);

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('should not render when dropRectangle set', () => {
      contentService.dropRectangle$ = of(mockActivityRectangles[0]);

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('should not render when fromRectangle set', () => {
      contentService.fromRectangle$ = of(mockActivityRectangles[0]);

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });

  describe('activityRectangles set', () => {
    it('should render', () => {
      contentService.activityRectangles$ = of(mockActivityRectangles);
      contentService.draggingRectangle$ = of(mockActivityRectangles[0]);
      contentService.dropRectangle$ = of(mockActivityRectangles[0]);
      contentService.fromRectangle$ = of(mockActivityRectangles[0]);
      contentService.clipRect$ = of({ x: 0, y: 0, width: 10, height: 10 });

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});
