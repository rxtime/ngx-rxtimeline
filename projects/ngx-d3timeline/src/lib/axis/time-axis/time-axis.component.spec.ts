import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimeAxisComponent } from './time-axis.component';
import { AxisService } from '../axis.service';
import { of } from 'rxjs';

describe('TimeAxisComponent', () => {
  let fixture: ComponentFixture<TimeAxisComponent>;
  let axisService: AxisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeAxisComponent],
      providers: [{ provide: AxisService, useValue: { vm$: jest.fn() } }]
    });

    fixture = TestBed.createComponent(TimeAxisComponent);
    axisService = TestBed.inject(AxisService);
  });

  it('should not render if view model is null', () => {
    axisService.timeAxis$ = of(null);
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render correctly', () => {
    axisService.timeAxis$ = of({
      ticks: [
        {
          label: 'tick 1',
          transform: 'translate(0, 10)',
          textAnchor: 'end'
        },
        {
          label: 'tick 2',
          transform: 'translate(0, 20)',
          textAnchor: 'end'
        }
      ],
      axisLine: { x1: 0, x2: 10, y1: 1, y2: 0 }
    });

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
