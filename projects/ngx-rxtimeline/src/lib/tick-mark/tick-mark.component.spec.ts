import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TickMarkComponent } from './tick-mark.component';
import { createLine, Line } from '../core/line';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[ngx-rxtimeline-line]',
  template: `
    <svg:g></svg:g>
  `
})
class FakeLineComponent {
  @Input() line: Line;
}

describe('AxisTickMarkComponent', () => {
  let fixture: ComponentFixture<TickMarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TickMarkComponent, FakeLineComponent]
    });

    fixture = TestBed.createComponent(TickMarkComponent);
  });

  it('should not render line when tickMark.line is falsy', () => {
    fixture.componentInstance.tickMark = {
      label: 'tickMark label',
      labelOffset: { x: 0, y: 1 },
      line: null,
      transform: 'translate(10,10)',
      fontFace: 'arial',
      fontSize: 10
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render line when tickMark.line is truthy', () => {
    fixture.componentInstance.tickMark = {
      label: 'tickMark label',
      labelOffset: { x: 0, y: 2 },
      line: createLine({ x: 0, y: 0 }, { x: 10, y: 10 }),
      transform: 'translate(10,10)',
      fontFace: 'arial',
      fontSize: 10
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
