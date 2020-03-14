import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ResourcesAxisComponent } from './resources-axis.component';
import { AxisService } from '../axis.service';
import { of } from 'rxjs';
import { Input, Component } from '@angular/core';
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

describe('ResourcesAxisComponent', () => {
  let fixture: ComponentFixture<ResourcesAxisComponent>;
  let axisService: AxisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesAxisComponent, FakeLineComponent],
      providers: [{ provide: AxisService, useValue: { vm$: jest.fn() } }]
    });

    fixture = TestBed.createComponent(ResourcesAxisComponent);
    axisService = TestBed.inject(AxisService);
  });

  it('should not render if view model is null', () => {
    axisService.resourceAxis$ = of(null);
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const line = createLine(origin, { x: 10, y: 10 });

    axisService.resourceAxis$ = of({
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
