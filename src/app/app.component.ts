import { Component } from '@angular/core';
import { deliveryData } from './data';
import { Activity } from 'ngx-d3timeline';
import { Options } from 'ngx-d3timeline';
import { BehaviorSubject } from 'rxjs';
import { scan, tap } from 'rxjs/operators';
import { AxisOptions } from 'projects/ngx-d3timeline/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activities = deliveryData;

  optionUpdateSubject = new BehaviorSubject<{ [key: string]: any }>(null);

  initialOptions: Options = {
    activityFontSize: 10,
    orientation: 'Vertical',
    resource: {
      gap: 0.25
    },
    resourceAxis: {
      showGridLines: true,
      tickLineLength: 0
    },
    timeAxis: {
      showGridLines: true,
      tickLineLength: 5
    }
  };

  options$ = this.optionUpdateSubject.pipe(
    scan(this.updateOptions, this.initialOptions),
    tap(console.log)
  );

  width = 400;
  height = 400;

  onDropped(activity: Activity) {
    console.log(activity);
  }

  flipOrientation(options: Options) {
    const orientation =
      options.orientation === 'Vertical' ? 'Horizontal' : 'Vertical';
    this.optionUpdateSubject.next({
      orientation
    });
  }

  update(key: string, orig: any, value: any) {
    this.optionUpdateSubject.next({
      [key]: { ...orig, ...value }
    });
  }

  onHovered(event: any) {
    console.log('hovered ', event);
  }

  onUnhovered(event: any) {
    console.log('unhovered ', event);
  }

  private updateOptions(options: Options, value: { [key: string]: any }) {
    console.log(value);
    return { ...{ ...options, ...value } };
  }
}
