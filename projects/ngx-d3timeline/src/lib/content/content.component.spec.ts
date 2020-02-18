import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimelineView } from '../view/timeline-view';
import { mockData } from '../mock-data';
import { Orientation } from '../orientation';
import { ContentComponent } from './content.component';
import { ContentViewModel } from './content-view-model';
import { ResourcesAxisViewModel } from '../axis/resources-axis/resources-axis-view-model';
import { TimeAxisViewModel } from '../axis/time-axis/time-axis-view-model';

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentComponent]
    });

    fixture = TestBed.createComponent(ContentComponent);
  });

  it('should not render if view model is null', () => {
    fixture.componentInstance.vm = null;
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  describe('when Vertical', () => {
    it('should render correctly', () => {
      fixture.componentInstance.vm = createContentVm(Orientation.Vertical);
      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });

  describe('when Horizontal', () => {
    it('should render correctly', () => {
      fixture.componentInstance.vm = createContentVm(Orientation.Horizontal);
      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});

function createContentVm(orientation: Orientation) {
  const timelineView = new TimelineView(300, 400, 50);
  const timeAxisVm = new TimeAxisViewModel(
    mockData,
    timelineView,
    null,
    orientation
  );
  const resourcesAxisVm = new ResourcesAxisViewModel(
    mockData,
    timelineView,
    orientation
  );
  return new ContentViewModel(
    mockData,
    timeAxisVm,
    resourcesAxisVm,
    orientation
  );
}
