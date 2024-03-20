import { TestBed } from '@angular/core/testing';

import { RnboBufferServiceService } from './rnbo-buffer-service.service';

describe('RnboBufferServiceService', () => {
  let service: RnboBufferServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboBufferServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
