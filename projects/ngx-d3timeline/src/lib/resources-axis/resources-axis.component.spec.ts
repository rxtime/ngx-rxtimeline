import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ResourcesAxisComponent } from './resources-axis.component';
import { ResourcesAxisViewModel } from './resources-axis-view-model';
import { mockData } from '../mock-data';
import { TimelineView } from '../view/timeline-view';
import { Orientation } from '../orientation';

describe('ResourcesAxisComponent', () => {
  let fixture: ComponentFixture<ResourcesAxisComponent>;
  const timelineView: TimelineView = new TimelineView(800, 600, 100);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesAxisComponent]
    });

    fixture = TestBed.createComponent(ResourcesAxisComponent);
  });

  it('should not render if view model is null', () => {
    const vm = null;
    fixture.componentInstance.vm = vm;

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  describe('when Vertical', () => {
    it('should render correctly', () => {
      const vm = new ResourcesAxisViewModel(
        mockData,
        timelineView,
        Orientation.Vertical
      );
      fixture.componentInstance.vm = vm;

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });

  describe('when Horizontal', () => {
    it('should render correctly', () => {
      const vm = new ResourcesAxisViewModel(
        mockData,
        timelineView,
        Orientation.Horizontal
      );
      fixture.componentInstance.vm = vm;

      fixture.detectChanges();

      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});
