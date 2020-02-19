import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimeAxisComponent } from './time-axis.component';
import { TimeAxisService } from './time-axis.service';
import { of } from 'rxjs';

describe('TimeAxisComponent', () => {
  let fixture: ComponentFixture<TimeAxisComponent>;
  let axisService: TimeAxisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeAxisComponent],
      providers: [{ provide: TimeAxisService, useValue: { vm$: jest.fn() } }]
    });

    fixture = TestBed.createComponent(TimeAxisComponent);
    axisService = TestBed.inject(TimeAxisService);
  });

  it('should not render if view model is null', () => {
    axisService.vm$ = of(null);
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render correctly', () => {
    axisService.vm$ = of({
      ticks: [
        {
          label: 'tick 1',
          transform: 'translate(0, 10)'
        },
        {
          label: 'tick 2',
          transform: 'translate(0, 20)'
        }
      ],
      axisLine: { x1: 0, x2: 10, y1: 1, y2: 0 }
    });

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
