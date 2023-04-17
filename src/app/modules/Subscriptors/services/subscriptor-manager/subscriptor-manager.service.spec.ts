import { TestBed } from '@angular/core/testing';

import { SubscriptorManagerService } from './subscriptor-manager.service';

describe('SubscriptorManagerService', () => {
  let service: SubscriptorManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptorManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
