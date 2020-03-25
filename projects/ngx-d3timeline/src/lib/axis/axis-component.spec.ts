import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AxisComponent } from './axis-component';
import { createLine, Line } from '../core/line';
import { origin } from '../core/point';
import { Component, Input } from '@angular/core';
import { TickMark } from '../tick-mark/tick-mark';

@Component({
  selector: '[ngx-d3timeline-line]',
  template: `
    <svg:g></svg:g>
  `
})
class FakeLineComponent {
  @Input() line: Line;
}

@Component({
  selector: '[ngx-d3timeline-axis-tick-mark]',
  template: `
    <svg:g class="axis-tick-mark"></svg:g>
  `
})
class FakeAxisTickMarkComponent {
  @Input() tickMark: TickMark;
}

describe('AxisComponent', () => {
  let fixture: ComponentFixture<AxisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AxisComponent,
        FakeLineComponent,
        FakeAxisTickMarkComponent
      ]
    });

    fixture = TestBed.createComponent(AxisComponent);
  });

  it('should render correctly', () => {
    const line = createLine(origin, { x: 10, y: 10 });
    fixture.componentInstance.axis = {
      tickMarks: [
        {
          label: 'tick 1',
          labelOffset: { x: 0, y: 1 },
          transform: 'translate(0, 10)',
          line
        },
        {
          label: 'tick 2',
          labelOffset: { x: 0, y: 2 },
          transform: 'translate(0, 20)',
          line
        }
      ],
      line: { x1: 0, x2: 10, y1: 1, y2: 0 },
      showGridLines: true,
      gridLines: [line]
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should not display axis line when axis.line is falsy', () => {
    const line = createLine(origin, { x: 10, y: 10 });
    fixture.componentInstance.axis = {
      tickMarks: [],
      line: null,
      showGridLines: true,
      gridLines: [line]
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should not show gridlines when axis.showGridLines is false', () => {
    const line = createLine(origin, { x: 10, y: 10 });
    fixture.componentInstance.axis = {
      tickMarks: [],
      line,
      showGridLines: false,
      gridLines: [line]
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
