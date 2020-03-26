import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivityRectangleComponent } from './activity-rectangle.component';

describe('ActivityRectangleComponent', () => {
  let fixture: ComponentFixture<ActivityRectangleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityRectangleComponent]
    });

    fixture = TestBed.createComponent(ActivityRectangleComponent);
  });

  it('should not render if activityRectangle is null', () => {
    fixture.componentInstance.activityRectangle = null;

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render correctly', () => {
    fixture.componentInstance.activityRectangle = {
      id: 1,
      title: 'Activity 1',
      type: 'Driving',
      transform: 'translate(50,0)',
      width: 50,
      height: 80,
      showTitle: true,
      fontSize: 10,
      fontFace: 'Arial',
      strokeWidth: 1
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should hide title when showTitle false', () => {
    fixture.componentInstance.activityRectangle = {
      id: 1,
      title: 'Activity 1',
      transform: 'translate(50,0)',
      type: 'Driving',
      width: 50,
      height: 80,
      showTitle: false,
      fontSize: 10,
      fontFace: 'Arial',
      strokeWidth: 1
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
