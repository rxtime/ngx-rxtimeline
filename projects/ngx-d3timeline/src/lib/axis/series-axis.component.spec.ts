import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SeriesAxisComponent } from './series-axis.component';
import { SeriesAxisViewModel } from './serie-axis-view-model';
import { timelineEventData } from '../timeline-event-data';
import { TimelineView } from '../view/timeline-view';

describe('SeriesAxisComponent', () => {
  let fixture: ComponentFixture<SeriesAxisComponent>;
  const timelineView: TimelineView = new TimelineView(800, 600, 100);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesAxisComponent]
    });

    fixture = TestBed.createComponent(SeriesAxisComponent);
  });

  it('should not render if view model is null', () => {
    const vm = null;
    fixture.componentInstance.vm = vm;

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const vm = new SeriesAxisViewModel(timelineEventData, timelineView);
    fixture.componentInstance.vm = vm;

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
