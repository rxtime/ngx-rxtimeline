import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SeriesAxisComponent } from './series-axis.component';
import { SeriesAxisViewModel } from './serie-axis-view-model';
import { timelineEventData } from '../timeline-event-data';
import { View } from '../view/view';

describe('SeriesAxisComponent', () => {
  let fixture: ComponentFixture<SeriesAxisComponent>;
  const view: View = {
    width: 800,
    height: 600,
    margin: 100
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesAxisComponent]
    });

    fixture = TestBed.createComponent(SeriesAxisComponent);
  });

  it('should render correctly', () => {
    const vm = new SeriesAxisViewModel(timelineEventData, view);
    fixture.componentInstance.vm = vm;

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
