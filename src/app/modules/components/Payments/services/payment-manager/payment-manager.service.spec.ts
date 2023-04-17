import { TestBed } from '@angular/core/testing';

import { PaymentManagerService } from './payment-manager.service';

describe('PaymentManagerService', () => {
  let service: PaymentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
