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
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  activities = deliveryData;

  optionUpdateSubject = new BehaviorSubject<{ [key: string]: any }>(null);

  initialOptions: Options = {
    orientation: 'Vertical',
    resource: {
      gap: 0,
      padding: 5
    },
    activity: {
      fontFace: 'Arial',
      fontSize: 12
    },
    resourceAxis: {
      showGridLines: false,
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
    scan(this.updateOptions, this.initialOptions)
  );

  width = '800px';
  height = '600px';

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

  onHovered(hovered: any) {
    console.log({ hovered });
    this.hoveredId = hovered;
  }

  onUnhovered(unhovered: any) {
    console.log({ unhovered });
    this.hoveredId = null;
  }

  onSelected(selected: any) {
    console.log({ hovered: selected });
    this.selectedId = selected;
  }

  private updateOptions(options: Options, value: { [key: string]: any }) {
    return { ...{ ...options, ...value } };
  }
}
