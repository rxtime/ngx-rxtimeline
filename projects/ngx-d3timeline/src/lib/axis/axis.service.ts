import { Injectable } from '@angular/core';
import { ScaleTime, ScaleBand } from 'd3-scale';
import { Orientation } from '../orientation';
import { Line } from './line';

@Injectable({ providedIn: 'root' })
export class AxisService {
  getAxisLine(
    scale: ScaleBand<string> | ScaleTime<number, number>,
    orientation: Orientation
  ): Line {
    const axisLine: Line = { x1: 0, x2: 0, y1: 0, y2: 0 };
    const rangeLimit = scale.range()[1];

    return orientation === Orientation.Vertical
      ? { ...axisLine, y2: rangeLimit }
      : { ...axisLine, x2: rangeLimit };
  }
}
