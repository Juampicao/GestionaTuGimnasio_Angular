import { TestBed } from '@angular/core/testing';

import { StatusManagerInjectorService } from './status-manager-injector.service';

describe('StatusManagerInjectorService', () => {
  let service: StatusManagerInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusManagerInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
