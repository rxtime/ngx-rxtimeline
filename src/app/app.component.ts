import { Component } from '@angular/core';
import { deliveryData } from './data';
import { Activity } from 'ngx-d3timeline';
import { Options } from 'ngx-d3timeline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activities = deliveryData;

  options: Options = {
    activityFontSize: 10,
    orientation: 'Vertical',
    resource: {
      gap: 0.25
    }
  };

  width = 400;
  height = 400;

  set resourceGap(value: number) {
    this.options = { ...this.options, resource: { gap: value } };
  }
  get resourceGap() {
    return this.options.resource.gap;
  }

  onDropped(activity: Activity) {
    console.log(activity);
  }

  flipOrientation() {
    this.options = {
      ...this.options,
      orientation:
        this.options.orientation === 'Vertical' ? 'Horizontal' : 'Vertical'
    };
  }
}
