import { Line } from './axis/line';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LineComponent } from './line.component';

describe('AxisLineComponent', () => {
  let fixture: ComponentFixture<LineComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineComponent]
    });

    fixture = TestBed.createComponent(LineComponent);
  });

  it('should render correctly', () => {
    const axisLine: Line = {
      x1: 0,
      x2: 50,
      y1: 0,
      y2: 50
    };
    fixture.componentInstance.line = axisLine;
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
