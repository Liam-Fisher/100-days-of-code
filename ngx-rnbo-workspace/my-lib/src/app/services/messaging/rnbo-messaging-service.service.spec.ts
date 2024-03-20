import { TestBed } from '@angular/core/testing';

import { RnboMessagingServiceService } from './rnbo-messaging-service.service';

describe('RnboMessagingServiceService', () => {
  let service: RnboMessagingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboMessagingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
