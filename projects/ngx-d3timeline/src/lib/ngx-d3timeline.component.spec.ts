import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxD3timelineComponent } from './ngx-d3timeline.component';
import { ResourcesAxisComponent } from './axis/resources-axis.component';
import { TimeAxisComponent } from './axis/time-axis.component';

describe('NgxD3timelineComponent', () => {
  let component: NgxD3timelineComponent;
  let fixture: ComponentFixture<NgxD3timelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxD3timelineComponent,
        ResourcesAxisComponent,
        TimeAxisComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxD3timelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
