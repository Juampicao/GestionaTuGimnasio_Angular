import { TestBed } from '@angular/core/testing';

import { InjectorPaymentService } from './injector-payment.service';

describe('InjectorPaymentService', () => {
  let service: InjectorPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjectorPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
