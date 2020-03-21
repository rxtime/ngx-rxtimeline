import { Line } from './core/line';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LineComponent } from './line.component';

describe('LineComponent', () => {
  let fixture: ComponentFixture<LineComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineComponent]
    });

    fixture = TestBed.createComponent(LineComponent);
  });

  it('should render correctly', () => {
    const line: Line = {
      x1: 0,
      x2: 50,
      y1: 0,
      y2: 50
    };
    fixture.componentInstance.line = line;
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
