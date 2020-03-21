import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AxisTickMarkComponent } from './axis-tick-mark.component';
import { createLine, Line } from '../axis/line';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[ngx-d3timeline-line]',
  template: `
    <svg:g></svg:g>
  `
})
class FakeLineComponent {
  @Input() line: Line;
}

describe('AxisTickMarkComponent', () => {
  let fixture: ComponentFixture<AxisTickMarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AxisTickMarkComponent, FakeLineComponent]
    });

    fixture = TestBed.createComponent(AxisTickMarkComponent);
  });

  it('should not render line when tickMark.line is falsy', () => {
    fixture.componentInstance.tickMark = {
      label: 'tickMark label',
      labelOffset: { x: 0, y: 1 },
      line: null,
      transform: 'translate(10,10)'
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render line when tickMark.line is truthy', () => {
    fixture.componentInstance.tickMark = {
      label: 'tickMark label',
      labelOffset: { x: 0, y: 2 },
      line: createLine({ x: 0, y: 0 }, { x: 10, y: 10 }),
      transform: 'translate(10,10)'
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
