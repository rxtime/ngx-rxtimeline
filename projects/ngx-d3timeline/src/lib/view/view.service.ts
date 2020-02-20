import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ViewService {
  readonly margin = 50;

  get rootTransform() {
    return `translate(${this.margin}, ${this.margin})`;
  }
}
