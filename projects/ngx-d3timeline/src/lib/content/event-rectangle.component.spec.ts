import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EventRectangleComponent } from './event-rectangle.component';

describe('EventRectangleComponent', () => {
  let fixture: ComponentFixture<EventRectangleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventRectangleComponent]
    });

    fixture = TestBed.createComponent(EventRectangleComponent);
  });

  it('should not render if eventRectangle is null', () => {
    fixture.componentInstance.eventRectangle = null;

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render correctly', () => {
    fixture.componentInstance.eventRectangle = {
      id: 1,
      title: 'Event 1',
      transform: 'translate(50,0)',
      width: 50,
      height: 80
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
