import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimeAxisComponent } from './time-axis.component';
import { TimelineView } from '../../view/timeline-view';
import { TimeAxisViewModel } from './time-axis-view-model';
import { mockData } from '../../mock-data';
import { Orientation } from '../../orientation';

describe('TimeAxisComponent', () => {
  let fixture: ComponentFixture<TimeAxisComponent>;
  const timelineView = new TimelineView({
    width: 300,
    height: 400,
    margin: 50
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeAxisComponent]
    });

    fixture = TestBed.createComponent(TimeAxisComponent);
  });

  it('should not render if view model is null', () => {
    fixture.componentInstance.vm = null;

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  describe('when Vertical', () => {
    it('should render correctly', () => {
      fixture.componentInstance.vm = new TimeAxisViewModel(
        mockData,
        timelineView,
        null,
        Orientation.Vertical
      );

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });

  describe('when Horizontal', () => {
    it('should render correctly', () => {
      fixture.componentInstance.vm = new TimeAxisViewModel(
        mockData,
        timelineView,
        null,
        Orientation.Horizontal
      );

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});
