export interface AxisViewModel {
  tickInfos: TickInfo[];
  axisLine: Line;
}

export interface TickInfo {
  label: string;
  transform: string;
}

export interface Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
