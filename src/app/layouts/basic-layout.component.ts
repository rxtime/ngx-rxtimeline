import { Component } from '@angular/core';

@Component({
  template: `
    <div class="timeline-container">
      <app-timeline></app-timeline>
    </div>
    <app-options></app-options>
  `,
  selector: 'app-basic-layout',
  styles: [
    `
      .timeline-container {
        width: 800px;
        height: 800px;
      }
    `
  ]
})
export class BasicLayoutComponent {}
