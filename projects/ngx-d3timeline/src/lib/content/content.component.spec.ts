import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimelineView } from '../view/timeline-view';
import { mockData } from '../mock-data';
import { Orientation } from '../orientation';
import { ContentComponent } from './content.component';
import { ResourcesAxisViewModel } from '../axis/resources-axis/resources-axis-view-model';
import { TimeAxisViewModel } from '../axis/time-axis/time-axis-view-model';
import { ContentService } from './content.service';
import { of } from 'rxjs';
import { EventRectangle } from './content';

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let contentService: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentComponent],
      providers: [{ provide: ContentService, useValue: jest.fn() }]
    });

    fixture = TestBed.createComponent(ContentComponent);
    contentService = TestBed.inject(ContentService);
  });

  it('should not render if eventRectangles are null', () => {
    contentService.eventRectangles$ = of(null);
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const rectangles: EventRectangle[] = [
      {
        title: 'Event 1',
        transform: 'translate(50,0)',
        width: 50,
        height: 80
      },
      {
        title: 'Event 2',
        transform: 'translate(130,0)',
        width: 60,
        height: 90
      }
    ];
    contentService.eventRectangles$ = of(rectangles);
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
