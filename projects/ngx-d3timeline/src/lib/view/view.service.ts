import { Injectable } from '@angular/core';
import { View } from './view';

@Injectable({ providedIn: 'root' })
export class ViewService {
  view: View = {
    width: 400,
    height: 600,
    margin: 50
  };

  get rootTransform() {
    return `translate(${this.view.margin}, ${this.view.margin})`;
  }
}
