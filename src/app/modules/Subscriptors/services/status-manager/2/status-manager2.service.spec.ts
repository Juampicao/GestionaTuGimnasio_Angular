import { TestBed } from '@angular/core/testing';

import { StatusManager2Service } from './status-manager2.service';

describe('StatusManager2Service', () => {
  let service: StatusManager2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusManager2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
