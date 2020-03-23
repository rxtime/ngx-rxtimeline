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
    orientation: 'Vertical'
  };

  width = 400;
  height = 400;

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

  onHovered(event: any) {
    console.log('hovered ', event);
  }

  onUnhovered(event: any) {
    console.log('unhovered ', event);
  }
}
