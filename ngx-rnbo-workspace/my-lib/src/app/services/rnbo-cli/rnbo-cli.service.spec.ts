import { TestBed } from '@angular/core/testing';

import { RnboCliService } from './rnbo-cli.service';

describe('RnboCliService', () => {
  let service: RnboCliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboCliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
