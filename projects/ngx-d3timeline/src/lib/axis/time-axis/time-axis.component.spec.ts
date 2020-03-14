import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimeAxisComponent } from './time-axis.component';
import { AxisService } from '../axis.service';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Line } from 'dist/ngx-d3timeline/lib/axis/line';
import { createLine } from '../line';
import { origin } from '../../point';

@Component({
  selector: '[ngx-d3timeline-line]',
  template: `
    <svg:g></svg:g>
  `
})
class FakeLineComponent {
  @Input() line: Line;
}

describe('TimeAxisComponent', () => {
  let fixture: ComponentFixture<TimeAxisComponent>;
  let axisService: AxisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeAxisComponent, FakeLineComponent],
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
    const line = createLine(origin, { x: 10, y: 10 });

    axisService.timeAxis$ = of({
      ticks: [
        {
          label: 'tick 1',
          transform: 'translate(0, 10)',
          line
        },
        {
          label: 'tick 2',
          transform: 'translate(0, 20)',
          line
        }
      ],
      line: { x1: 0, x2: 10, y1: 1, y2: 0 }
    });

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
