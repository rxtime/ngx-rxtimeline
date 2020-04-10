import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a routerLink="basic">Basic</a> | <a routerLink="grid">Grid</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
