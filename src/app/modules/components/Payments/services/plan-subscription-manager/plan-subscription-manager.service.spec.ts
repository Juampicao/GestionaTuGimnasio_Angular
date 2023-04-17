import { TestBed } from '@angular/core/testing';

import { PlanSubscriptionManagerService } from './plan-subscription-manager.service';

describe('PlanSubscriptionManagerService', () => {
  let service: PlanSubscriptionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanSubscriptionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
