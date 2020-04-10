import { Component } from '@angular/core';

@Component({
  template: `
    <app-timeline></app-timeline>
    <app-options></app-options>
  `,
  selector: 'app-css-grid-layout',
  styles: [
    `
      :host {
        display: grid;
      }
    `
  ]
})
export class CssGridLayoutComponent {}
