import { TestBed } from '@angular/core/testing';

import { StatusManagerService } from './status-manager.service';

describe('StatusManagerService', () => {
  let service: StatusManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
