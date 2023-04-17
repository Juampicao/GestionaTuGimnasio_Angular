import { TestBed } from '@angular/core/testing';

import { ViewSubscriptorService } from './view-subscriptor.service';

describe('ViewSubscriptorService', () => {
  let service: ViewSubscriptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSubscriptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
