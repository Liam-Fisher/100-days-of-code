import { TestBed } from '@angular/core/testing';

import { RnboMessagingService } from './rnbo-messaging.service';

describe('RnboMessagingService', () => {
  let service: RnboMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
