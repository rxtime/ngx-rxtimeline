import { Component, ViewEncapsulation } from '@angular/core';
import { OptionsService } from '../options/options.service';
import { Activity } from 'ngx-rxtimeline';
import { deliveryData } from '../data';

@Component({
  template: `
    <ngx-rxtimeline
      [activities]="activities"
      [style.width]="'100%'"
      [style.height]="'100%'"
      [options]="options$ | async"
      [selectedId]="selectedId"
      [hoveredId]="hoveredId"
      (activityDropped)="onDropped($event)"
      (resourceHovered)="onHovered($event)"
      (resourceUnhovered)="onUnhovered($event)"
      (resourceSelected)="onSelected($event)"
      (activityHovered)="onHovered($event)"
      (activityUnhovered)="onUnhovered($event)"
      (activitySelected)="onSelected($event)"
      class="demo-app"
    ></ngx-rxtimeline>
  `,
  selector: 'app-timeline',
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['timeline.component.scss']
})
export class TimelineComponent {
  options$ = this.optionsService.options$;

  selectedId = null;
  hoveredId = null;

  width = '800px';
  height = '600px';

  activities = deliveryData;

  constructor(private optionsService: OptionsService) {}

  onDropped(activity: Activity) {
    console.log(activity);
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
}
