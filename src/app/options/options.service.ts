import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Options } from 'projects/ngx-rxtimeline/src/public-api';
import { scan } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OptionsService {
  private optionUpdateSubject = new BehaviorSubject<{ [key: string]: any }>(
    null
  );

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
        lateralMargin: 10,
        zIndex: -1
      },
      DriveBreak: {
        activity: {
          disableDrag: true
        }
      }
    }
  };

  options$ = this.optionUpdateSubject.pipe(
    scan(this.updateOptions, this.initialOptions)
  );

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

  private updateOptions(options: Options, value: { [key: string]: any }) {
    return { ...{ ...options, ...value } };
  }
}
