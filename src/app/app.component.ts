import { Component } from '@angular/core';
import { deliveryData } from './data';
import { Activity } from 'ngx-d3timeline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activities = deliveryData;
  orientation = 'Vertical';

  width = 400;
  height = 400;

  onDropped(event: Activity) {
    console.log(event);
  }
}
