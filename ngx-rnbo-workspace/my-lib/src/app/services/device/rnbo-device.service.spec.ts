import { TestBed } from '@angular/core/testing';

import { RnboDeviceService } from './rnbo-device.service';

describe('RnboDeviceService', () => {
  let service: RnboDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
