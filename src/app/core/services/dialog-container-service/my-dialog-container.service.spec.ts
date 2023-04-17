import { TestBed } from '@angular/core/testing';

import { MyDialogContainerService } from './my-dialog-container.service';

describe('MyDialogContainerService', () => {
  let service: MyDialogContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDialogContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
