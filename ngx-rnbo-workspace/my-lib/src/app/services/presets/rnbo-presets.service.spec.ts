import { TestBed } from '@angular/core/testing';

import { RnboPresetsService } from './rnbo-presets.service';

describe('RnboPresetsService', () => {
  let service: RnboPresetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboPresetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
