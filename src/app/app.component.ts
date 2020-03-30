import { Component, ViewEncapsulation } from '@angular/core';
import { deliveryData } from './data';
import { Activity } from 'ngx-d3timeline';
import { Options } from 'ngx-d3timeline';
import { BehaviorSubject } from 'rxjs';
import { scan, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  activities = deliveryData;

  optionUpdateSubject = new BehaviorSubject<{ [key: string]: any }>(null);

  initialOptions: Options = {
    orientation: 'Vertical',
    resource: {
      gap: 0,
      padding: 5,
      showRectangles: true
    },
    activity: {
      fontFace: 'Arial',
      fontSize: 12
    },
    resourceAxis: {
      showGridLines: true,
      tickLineLength: 0,
      showAxisLine: false
    },
    timeAxis: {
      showGridLines: true,
      tickLineLength: 5,
      showAxisLine: true
    },
    type: {
      Driving: {
        lateralMargin: 10
      },
      DriveBreak: {
        activity: {
          disableDrag: true
        }
      }
    }
  };

  selectedId = null;
  hoveredId = null;

  options$ = this.optionUpdateSubject.pipe(
    scan(this.updateOptions, this.initialOptions),
    tap(console.log)
  );

  width = 800;
  height = 600;

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
    this.hoveredId = event;
  }

  onUnhovered() {
    this.hoveredId = null;
  }

  onSelected(event: any) {
    console.log({ event });
    this.selectedId = event;
  }

  private updateOptions(options: Options, value: { [key: string]: any }) {
    console.log(value);
    return { ...{ ...options, ...value } };
  }
}
