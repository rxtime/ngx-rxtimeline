import { Component } from '@angular/core';
import { OptionsService } from './options.service';

@Component({
  selector: 'app-options',
  template: `
    <ng-container *ngIf="optionsService.options$ | async as options">
      <div>
        <label>Resource Gap (0-1)</label>
        <input
          [value]="options.resource.gap"
          (keyup)="
            optionsService.update('resource', options.resource, {
              gap: +$event.target.value
            })
          "
        />
      </div>
      <div>
        <label>Resource padding</label>
        <input
          [value]="options.resource.padding"
          (keyup)="
            optionsService.update('resource', options.resource, {
              padding: +$event.target.value
            })
          "
        />
      </div>
      <button (click)="optionsService.flipOrientation(options)">
        Flip Orientation
      </button>
      <span>{{ options.orientation }}</span>

      <div>
        <span>Resource Axis options</span>
        <div>
          <input
            type="checkbox"
            [checked]="options.resourceAxis.showGridLines"
            (change)="
              optionsService.update('resourceAxis', options.resourceAxis, {
                showGridLines: !options.resourceAxis.showGridLines
              })
            "
          />
          <label>Show grid lines</label><br />
        </div>
        <div>
          <input
            type="checkbox"
            [checked]="options.resourceAxis.showAxisLine"
            (change)="
              optionsService.update('resourceAxis', options.resourceAxis, {
                showAxisLine: !options.resourceAxis.showAxisLine
              })
            "
          />
          <label>Show axis lines</label><br />
        </div>
        <div>
          <input
            [value]="options.resourceAxis.tickLineLength"
            (keyup)="
              optionsService.update('resourceAxis', options.resourceAxis, {
                tickLineLength: +$event.target.value
              })
            "
          />
          <label>Tick line length</label><br />
        </div>
      </div>
      <div>
        <span>Time Axis options</span>
        <div>
          <input
            type="checkbox"
            [checked]="options.timeAxis.showGridLines"
            (change)="
              optionsService.update('timeAxis', options.timeAxis, {
                showGridLines: !options.timeAxis.showGridLines
              })
            "
          />
          <label>Show grid lines</label><br />
        </div>
        <div>
          <input
            type="checkbox"
            [checked]="options.timeAxis.showAxisLine"
            (change)="
              optionsService.update('timeAxis', options.timeAxis, {
                showAxisLine: !options.timeAxis.showAxisLine
              })
            "
          />
          <label>Show axis lines</label><br />
        </div>
        <div>
          <input
            [value]="options.timeAxis.tickLineLength"
            (keyup)="
              optionsService.update('timeAxis', options.timeAxis, {
                tickLineLength: +$event.target.value
              })
            "
          />
          <label>Tick line length</label><br />
        </div>
      </div>
    </ng-container>
  `
})
export class OptionsComponent {
  constructor(public optionsService: OptionsService) {}
}
