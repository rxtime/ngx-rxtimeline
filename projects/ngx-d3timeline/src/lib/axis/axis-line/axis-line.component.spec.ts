import { Line } from '../line';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AxisLineComponent } from './axis-line.component';
import { Component, Input } from '@angular/core';

describe('AxisLineComponent', () => {
  let fixture: ComponentFixture<AxisLineComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AxisLineComponent]
    });

    fixture = TestBed.createComponent(AxisLineComponent);
  });

  it('should render correctly', () => {
    const axisLine: Line = {
      x1: 0,
      x2: 50,
      y1: 0,
      y2: 50
    };
    fixture.componentInstance.axisLine = axisLine;
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
