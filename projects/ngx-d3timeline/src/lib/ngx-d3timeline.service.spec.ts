import { TestBed } from '@angular/core/testing';

import { NgxD3timelineService } from './ngx-d3timeline.service';

describe('NgxD3timelineService', () => {
  let service: NgxD3timelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxD3timelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
