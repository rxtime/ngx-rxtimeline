import { Component, Input } from '@angular/core';
import { Axis } from './axis';

@Component({
  selector: '[ngx-rxtimeline-axis]',
  template: `
    <svg:g class="axis-group" [ngClass]="axis.orientation">
      <svg:g
        *ngFor="let tickMark of axis.tickMarks"
        ngx-rxtimeline-tick-mark
        [tickMark]="tickMark"
      ></svg:g>
      <ng-container *ngIf="axis.showGridLines">
        <svg:g
          *ngFor="let gridLine of axis.gridLines"
          class="grid-line"
          ngx-rxtimeline-line
          [line]="gridLine"
        ></svg:g>
      </ng-container>
      <svg:g
        class="axis-line"
        *ngIf="axis.line"
        ngx-rxtimeline-line
        [line]="axis.line"
      ></svg:g>
    </svg:g>
  `
})
export class AxisComponent {
  @Input() axis: Axis;
}
